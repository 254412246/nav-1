const $siteList = $('.siteList')
const $last = $siteList.find('li.last')
const x = JSON.parse(window.localStorage.getItem('x'))
const hashMap = x || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'G', url: 'https://gitee.com/' },
    { logo: 'I', url: 'https://www.iconfont.cn' },
    { logo: 'T', url: 'https://tool.lu/' },

]
const removeX = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">${removeX(node.url)[0].toUpperCase()}</div>
                <div class="link">${removeX(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                            <use xlink:href="#icon-shanchu"></use>
                    </svg>
                </div>
            </div>
        </a>
    </li>`).insertBefore($last)
        $li.on('click','.close',(e)=>{
            e.preventDefault()  //阻止冒泡
            console.log('ss123')

            if(window.confirm("您确定要删除该网址吗？")){
                hashMap.splice(index,1)
                render()
            }
        })
    })
}
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('添加网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        } console.log(url)
        hashMap.push({
            logo: url[0],
            url: url
        });
        render()
    })

onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
    $(document).on('keypress',(e)=> {
        const {key}= e
        console.log(key);
        for (let i=0;i<hashMap.length;i++){
            if (hashMap[i].logo.toLowerCase()===key){
            open(hashMap[i].url)
            }
        }
    })


