import subprocess, sys, re, signal, os

IS_WINDOWS = os.name == 'nt'

MV = "move" if IS_WINDOWS else "mv"

magenta = "\x1b[35;20m"
green = "\x1b[32;20m"
blue = "\x1b[34m"
yellow = "\x1b[33;20m"
red = "\x1b[31;20m"
reset = "\x1b[0m"

_print = __builtins__['print']
def fotmat(*args, **kwargs) :
  _print(*args, reset, **kwargs) 
__builtins__['print'] = fotmat

def signal_handler(sig, frame):
  print(f'\n\n{yellow}batch inturrupted, terminating...')
  sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)

def handle_error(e: Exception, message: str, command: str) -> None : 
  print(f"{red}[ERROR]\t{e}")
  print(f"{red}[ERROR]\tFailed to {message}. Failed command was {yellow}{command}")
  sys.exit(0)

def run_command(command: str, desc: str, supress_error: bool = False) -> tuple[str|None, str|None] :
  try :
    print(f"{magenta}TASK{reset}\t{desc}{reset}...", end=" ")
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, errors = process.communicate()
    if process.returncode != 0 :
      raise Exception("Process return code was not 0", errors)
    if errors :
      raise Exception(errors)

    print(f"{green}SUCCESS")
    return output.decode("utf-8"), None
  except Exception as e:
    if supress_error : return None, output.decode("utf-8")
    print(f"{red}FAILED")
    handle_error(e, desc, command)

def find_regex(pattern: str, text: str) -> str | None :
  try:
    re.compile(pattern)
  except re.error:
    return print("invalid regex pattern")

  match = re.findall(pattern, text)
  if len(match) > 1 :
    return print("regex matches more than one, try change pattern.")
  return match[0] if match else None

if "build" == sys.argv[1] :
  versioning = sys.argv[2]
  if versioning != "no_change" :
    output, error = run_command("git status", "git commit check")
    commit = find_regex(r"Changes not staged for commit:", output)
    if commit :
      print(f"{blue}INFO\tunstaged commit found. you need to commit first.")
      print(f"{blue}INFO\tplease check your changes or enter commit title below, press {yellow}ctrl + c{blue} to escape")
      
      title = input(f"{yellow}INPUT\t{reset}")
      run_command(f'git commit -am "{title}\n"', f'{blue}git commit -am "{title}"')

    output, error = run_command(f"yarn version --{versioning}", "package.json versioning")
    version = find_regex(r"New version:\s+(\d+\.\d+\.\d+)", output)
    output, error = run_command(f"jq \".version |= \\\"{version}\\\"\" public/manifest.json > public/manifest.json.tmp", "manifest.json versioning[1/3]")
    output, error = run_command(f"rm ./public/manifest.json", "manifest.json versioning[2/3]")
    output, error = run_command(f"{MV} public/manifest.json.tmp public/manifest.json", "manifest.json versioning[3/3]")

    print(f"{blue}INFO{reset}\tUpdated version to {yellow}{version}")
  else :
    print(f"{blue}INFO{reset}\tVersioning is disabled, ignoring.")

  run_command("yarn build", "generating dist builds, this may take some time")
  run_command("yarn build", "generating dist builds, this may take some time")
  run_command("rmdir build /s /q", "purging local build")

  print(f"{green}DONE\tbatch updated successfully")