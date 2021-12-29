// BetterWRD Other

chrome.storage.local.get('autoRefreshWRD', saved => {

    // Stop if user is on a cloudflare page
    if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return


    // Better animation on navbar items
    document.querySelectorAll('.navItem').forEach(navitems => navitems.style.transition = '.35s all')


    // Placeholder text colors
    setTimeout(()=> {
        if(localStorage.getItem('bwrd_thememode') == 'night'){
            document.documentElement.style.colorScheme = 'dark'
            document.head.appendChild(document.createElement('style')).innerHTML = '*::placeholder{color: rgb(185, 185, 185); opacity: 1;}'
        }
        else{
            document.head.appendChild(document.createElement('style')).innerHTML = '*::placeholder{color: rgb(70, 70, 70); opacity: 1;}'
        }
    }, 200)


    // Remove navbar bottom border
    document.head.appendChild(document.createElement('style')).innerHTML = '#navigationbar{border-bottom: none!important;}'


    // Change scrollbar colors on theme change
    if(themer){
        themer.addEventListener('click', ()=> {
            if(themer.checked) {document.documentElement.style.colorScheme = 'light'}
            else {document.documentElement.style.colorScheme = 'dark'}
        })
    }


    // Better Night Theme
    setTimeout(()=> {
        if(localStorage.getItem('bwrd_thememode') == 'night'){
            
            const pw = document.querySelector('[title="Personal website"]')
            const pins = document.querySelectorAll('.pin')
            const views = document.querySelectorAll('.viewsicon')

            // Make pinned thread icon white
            if(pins && localStorage.getItem('bwrd_thememode') == 'night'){
                pinwhite = chrome.runtime.getURL('etc/img/pinwhite.svg')
                pins.forEach(pins => pins.style.background = `url(${pinwhite})`)
            }

            // Make views icon white
            if(views && localStorage.getItem('bwrd_thememode') == 'night'){
                viewswhite = chrome.runtime.getURL('etc/img/viewwhite.png')
                views.forEach(views => views.style.backgroundImage = `url(${viewswhite})`)
            }

            // Make website logo white
            if(pw){
                pw.firstChild.style.background = `url(${chrome.runtime.getURL('etc/img/domain.png')})`
            }

            // Make guidelines, privacy and terms of use pages dark mode
            if(location.pathname.includes('guidelines') || location.pathname.includes('privacy') || location.pathname.includes('terms')){
                document.body.style.backgroundColor = '#181919'
                document.body.style.color = 'white'
            }
        }
    }, 200)


    // Don't turn input color all white on autofill
    document.head.appendChild(document.createElement('style')).innerHTML = 'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active { transition: background-color 999999999s ease-in-out 0s; }'
    document.querySelectorAll('input, select').forEach(elm => {elm.style.outline = 'none'})


    // Don't add 'themebtn' class to delete post button
    document.querySelectorAll('span.button.btn_deletereply').forEach(e => {
        e.style.setProperty('background', '0', 'important')
        e.style.setProperty('border', '0', 'important')
    })


    // Auto refresh WRD when a setting is changed
    function checkChange(change, changes){
        return changes.includes(change)
    }
    chrome.storage.onChanged.addListener((changes)=> {
        changes = Object.keys(changes)[0]

        if(!saved.autoRefreshWRD) return
        if(checkChange('unsavedtheme', changes) || checkChange('customthemes', changes)) return
        if(location.href.includes('newreply') || location.href.includes('newthread')) return

        location.reload()
    })
})


// Make Edit/Delete post buttons bigger
if(document.getElementsByClassName('replygroup')[0]){
    document.querySelectorAll('.reply_menu').forEach(e => {
        if(!e.firstElementChild) return

        const editbtn = e.firstElementChild.firstElementChild
        const delbtn = e.lastElementChild.firstElementChild

        editbtn.className = 'themebtn btn theme1 round border1 threadbtn'
        editbtn.style.padding = '5px 10px'
        editbtn.style.filter = 'brightness(1.4)'
        editbtn.style.cursor = 'pointer'

        delbtn.className = 'themebtn btn theme1 round border1 threadbtn'
        delbtn.style.padding = '5px 10px'
        delbtn.style.filter = 'brightness(1.4)'
        delbtn.style.cursor = 'pointer'

        e.style.padding = '4px'
    })
}


// New BWRD Version Notification
if(typeof InstallTrigger == 'undefined'){ // Check if user is not using Firefox
    fetch('https://flameplus.vercel.app/bwrd/ver.json')
    .then(res => res.json())
    .then((out) => {
        if(!document.querySelector('#navigationbar')) return
        if(out.version != chrome.runtime.getManifest().version){
            const notif = document.createElement('div')
            notif.innerHTML = `<div class="theme1 border1" style="position: relative;margin: 25px auto;width: 100%;max-width: 1076px;margin-bottom: 10px;border-radius: 8px;user-select: none;padding: 15px;overflow: hidden;"> <h1 style="padding-bottom: 10px;margin: 0;font-size: 20px;text-align: left;">A new version of BetterWRD is out — Please update now.</h1> <div style=" display: flex; align-items: center; gap: 8px; "> <a href="${out.link}" class="btn btn-primary themebtn" id="carddl" target="_blank" style="position: relative;display: inline-flex;align-items: center;padding: 8px 20px;font-size: 14px;font-weight: 500!important;border-style: none!important;border-radius: 10px;box-shadow: none;background: linear-gradient(to right, #8aaaff, rgba(237,98,206,0.88))!important;color: black; transition: .16s all" type="button"> <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000" height="20px" width="20px" style="vertical-align: middle;margin-right: 8px;"> <g> <rect fill="none" height="24" width="24"></rect> </g> <g> <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"></path> </g> </svg>Download Now</a> <p style="opacity: .8;font-size: 14px;">your settings, themes, drafts etc will not be deleted.</p> </div> <div style=" position: absolute; height: 100%; top: 0; right: 10px; display: flex; "> <img src="https://flameplus.vercel.app/bwrd/img/logo.png" style="width: 100px;height: 100px;padding: 10px;filter: brightness(1000%);"> <div style=" position: absolute; height: 100%; width: 650%; right: -10px; background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(167 61 147 / 56%) 100%); animation: updateanim .45s ease-out;"></div> </div> </div> <style>#carddl:hover { transform: scale(.94)!important; } @keyframes updateanim { from {transform: translateX(650%);} to {transform: translateX(0px);} }</style>`
            if(document.getElementsByTagName('main')[0]){
                document.body.appendChild(notif)
                document.body.insertBefore(notif, document.getElementsByTagName('main')[0])
            }
        }
    })
}


// Fix Image SIzing on Conversation page
if(location.pathname.includes('messages')){
    document.head.appendChild(document.createElement('style')).innerHTML = `
    img {
        width: auto;
        height: auto;
        display: initial;
        margin: initial!important;
    }
    .rows img {
        width: 65px !important;
        height: 65px !important;
        display: inline-block !important;
        margin: 0 var(--padding)!important;
    }
    .row img {
        width: 65px !important;
        height: 65px !important;
        margin-right: var(--padding) !important;
    }
    `
}


// Make cloudflare page dark if user is using night theme
if(document.getElementById('cf-wrapper') && document.cookie.includes('night')){
    document.querySelectorAll('*').forEach(elm => {
        elm.style.backgroundColor = 'black'
        elm.style.color = 'rgb(210,210,210)'
    })
    document.querySelector('.bg-gradient-gray').style.background = 'black'
}