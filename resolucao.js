const fs =require("fs")
function lerarquivo (){
    const data = fs.readFileSync ("broken-database.json")
    const parcedData = JSON.parse (data)
    return parcedData

}

function corrigirnome (arquivo){
    arquivo.forEach(element => {
        element.name  = element.name.replace(/æ/g,"a")
            .replace(/¢/g,"c")
            .replace(/ø/g,"o")
            .replace(/ß/g,"b")


    });
    return arquivo
}

function preco (arquivo){
    arquivo.forEach(valor =>{
        valor.price = parseFloat (valor.price)

    })
    return arquivo
}

function corrigirquantidade (arquivo){
    arquivo.forEach(element => {
        if (!element.quantity) {
            element.quantity = 0
        }
    })
    return arquivo
}

function exportarJSON (arquivo){
    fs.writeFileSync("saida.JSON",JSON.stringify(arquivo),"utf-8")
}

function exibirtodosositens (arquivo){
    arquivo.forEach (element => {
        console.log (element.name)
    })
}

function calcularsomaporcategoria (arquivo){
    let quantidadepanelas = 0
    let quantidadeeletronicos = 0
    let quantidadeacessorios = 0
    let quantidadeeletrodomesticos = 0
    arquivo.forEach (element => {
        if(element.category =="Panelas"){
            quantidadepanelas += element.quantity
        }
        if(element.category =="Eletrodomésticos"){
            quantidadeeletrodomesticos += element.quantity
        }
        if(element.category =="Eletrônicos"){
            quantidadeeletronicos += element.quantity
        }
        if(element.category =="Acessórios"){
            quantidadeacessorios += element.quantity
        }
    })
    return{
        quantidadepanelas,quantidadeeletrodomesticos,quantidadeeletronicos,quantidadeacessorios
    }
    
}

let arquivo = lerarquivo ()
arquivo = corrigirnome (arquivo)
arquivo = preco (arquivo)
arquivo = corrigirquantidade (arquivo)
exportarJSON (arquivo)

exibirtodosositens (arquivo)

console.log (calcularsomaporcategoria (arquivo))
