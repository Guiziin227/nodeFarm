const fs = require('fs')
const url = require('url')
const http = require('http')
const path = require('path')
const replaceTemplate = require('./modules.js/replaceTemplate')

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)
// const textOut = `This is textOut ${textIn}`
// fs.writeFileSync('./txt/gui.txt',textOut)
// console.log('Processando...')

// fs.readFile('./txt/start.txt','utf-8',(err, data1) => {
//     if(err) return console.log('ERROR!')
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) => {
//         fs.readFile(`./txt/append.txt`,'utf-8', (err, data3) => {
            
//             fs.writeFile("./txt/escrita.txt", `${data2}\n${data3}`,'utf-8', err => {
//                 if(err) return console.log('Algo falhou no final')
//                 console.log('Processado')
//             })
//         })
//     })
// })

// console.log('Processando...')


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
 const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)
    
    //Overview page
    if(pathname === "/" || pathname === '/overview'){
        res.writeHead(200, {'Content-type' : 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml)


        res.end(output)
    //Product page
    } else if (pathname === '/product'){
        res.writeHead(200, {'Content-type' : 'text/html'})
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)

        res.end(output)


    //API
    } else if(pathName === '/api') {
        res.writeHead(200, {'Content-type' : 'application/json'})
        res.end(data)
    //Not found
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello world'
        })
        res.end('<h1>Page not found</h1>')
    }

})

server.listen(8000,'192.168.0.13',() => {
    console.log('Funcionando')
})