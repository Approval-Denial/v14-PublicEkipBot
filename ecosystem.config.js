let sunucu = "Raid"
module.exports = {
  apps: [
     {
       name: sunucu+"-Mainframe",
       namespace: "Approval",
       script: 'main.js',
       watch: false,
       exec_mode: "cluster",
       max_memory_restart: "2G",
       cwd: "./Bots/Main"
     },
      {
        name: sunucu+"-Stats",
        namespace: "Approval",
        script: 'main.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Stats"
      },
      {
        name: sunucu+"-Prosecutor",
        namespace: "Approval",
        script: 'main.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Prosecutor"
      },
      {
        name: sunucu+"-Guard",
        namespace: "Approval",
        script: 'main.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Guard"
      },
      {
        name: sunucu+"-GuardTwo",
        namespace: "Approval",
        script: 'main.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/GuardTwo"
      },
      {
        name: sunucu+"-GuardThree",
        namespace: "Approval",
        script: 'main.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/GuardThree"
      },
      /*-----------------------------------*/
       {
         name: sunucu+"-WelcomeOne",
         namespace: "Approval",
         script: 'welcomeOne.js',
         watch: false,
         exec_mode: "cluster",
         max_memory_restart: "2G",
         cwd: "./Bots/Welcomes"
       }
  ]
};