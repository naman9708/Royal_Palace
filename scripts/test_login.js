const fetch = globalThis.fetch || require('node-fetch')
const base = 'http://localhost:3000'
;(async ()=>{
  try{
    // get CSRF token
    const r1 = await fetch(base + '/api/auth/csrf')
    const data = await r1.json()
    const csrfToken = data.csrfToken
    console.log('csrfToken:', csrfToken)

    // post credentials
    const params = new URLSearchParams()
    params.append('csrfToken', csrfToken)
    params.append('callbackUrl', base + '/')
    params.append('json', 'true')
    params.append('email', 'royalplace831@gmail.com')
    params.append('password', 'Royal@8434')

    const r2 = await fetch(base + '/api/auth/callback/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'manual'
    })
    const text = await r2.text()
    console.log('status', r2.status)
    console.log(text)
  }catch(e){
    console.error(e)
    process.exit(1)
  }
})()
