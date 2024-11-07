import {Command} from 'commander'
const program = new Command()

program
    //1 Comando, 2 descripcion, 3 Valor por default
    .option('-m, --mode <mode>','Working mode' ,'dev')
    .option('-p, --port <port>','Port number' , 3000)
program.parse()

export default program