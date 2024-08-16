const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColor()
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type === "lock") {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
        node.classList.toggle('fa-unlock')
        node.classList.toggle("fa-lock")
        //console.log(event.target.children)
    }
    else if (type === 'copy') {
        copytoClickboard(event.target.textContent)
    }
})
// const generateRandomCol = () => {
//     const hexCod = '0123456789ABCDEF'
//     let color = ''
//     for (let i = 0; i < 6; i++) {
//         color += hexCod[Math.floor(Math.random() * hexCod.length)]
//     }
//     return '#' + color
// }
// генерация рандомных цветов
const setRandomColor = (isInitial) => {
    const colors = isInitial ? getcolorsfromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')


        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }


        text.textContent = color
        col.style.background = color

        setTextColor(text, color, button)
    })
    updateLocationHash(colors)
}

const copytoClickboard = (text) => {
    return navigator.clipboard.writeText(text)
}

const updateLocationHash = (colors = []) => {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)
    }).join('-')

}

const getcolorsfromHash = () => {
    if (document.location.hash.length > 1) {
        document.location.hash.substring(1).split('-').map(color => {
            '#' + color
        })
    }
    return []
}

const setTextColor = (text, color, button) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
    button.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColor(true)