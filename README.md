This file will help you set up and open the website without any problem. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Needed instalations 
- WSL for windows
- Node js
- npm
- vue js
- IDE Setup 
- Access to Github 
- Git

## Project Setup
After having installed the needed software, you first have to clone the repository into your machine via this link https://github.com/Nilssteingraeber/PrepperApp

Once it is cloned you can open the WSL terminal and change your folder to the folder where the cloned repository is:
cd /cloned/repository/folder

After that you should open the code with wsl using this command:
code . 

This will open your IDE Setup, in our case we are using VSCode. Once vsCode is opened, open a new terminal and type this command:
cd client 
and then this :
npm run dev 

Once that command is run you will have something that looks like this:

> client@0.0.0 dev
> vite

Re-optimizing dependencies because lockfile has changed

  VITE v5.2.11  ready in 2880 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
...

There you have a local variable which is the http that you should copy past in your browser. 
