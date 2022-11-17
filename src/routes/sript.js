const productCart1 = document.querySelector(".latest_products_cart:nth-child(3)")
const btnVerMaisImpressorasResina = document.createElement("button")
btnVerMaisImpressorasResina.classList.add("btnVerMaisImpressorasResina")
btnVerMaisImpressorasResina.textContent = "Ver tudo"
btnVerMaisImpressorasResina.addEventListener("click", categoriaImpressorasResina,)

productCart1.appendChild(btnVerMaisImpressorasResina)

function categoriaImpressorasResina(){
location.href="https://lupa3d.com.br/search/impressoras-de-resina"
}

const productCart2 = document.querySelector(".latest_products_cart:nth-child(5)")
const btnVerMaisResinas = document.createElement("button")
btnVerMaisResinas.classList.add("btnVerMaisImpressorasResina")
btnVerMaisResinas.textContent = "Ver tudo"
btnVerMaisResinas.addEventListener("click", categoriaResina,)

productCart2.appendChild(btnVerMaisResinas)

function categoriaResina(){
location.href="https://lupa3d.com.br/search/resinas-3d"
}