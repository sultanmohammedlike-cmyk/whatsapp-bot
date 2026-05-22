const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const http = require('http');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

let qrImageUrl = '';

client.on('qr', async qr => {
    qrImageUrl = await qrcode.toDataURL(qr);
    console.log('✅ QR ready!');
});

client.on('ready', () => console.log('✅ Bot is ready!'));

client.on('disconnected', (reason) => {
    console.log('❌ Bot disconnected:', reason);
    client.initialize();
});

client.on('message', async msg => {
    const body = msg.body.toLowerCase().trim();

    if (body === 'hi' || body === 'hello' || body === 'hey') {
        await msg.reply(`👋 Hello! Welcome to *Adigispark* 🚀
_"Your Growth, Our Mission"_

We are a full-service *Digital Marketing Agency* helping businesses grow online. Here's what we do:

📱 *Social Media Management*
   — Content, strategy & growth for your brand

🌐 *Web Design & Development*
   — Stunning, fast & mobile-friendly websites

🤖 *Business Automation*
   — Automate your workflows & save time

🔗 *Networking & Outreach*
   — Connect with the right audience

━━━━━━━━━━━━━━━
Reply with a number to know more:

*1* — Social Media Management
*2* — Web Design
*3* — Business Automation
*4* — Networking
*5* — Pricing & Packages
*6* — Talk to a Human 👤

🌍 Visit us: https://www.adigispark.in
━━━━━━━━━━━━━━━`);

    } else if (body === '1') {
        await msg.reply(`📱 *Social Media Management*

We handle your social media so you can focus on your business!

✅ Content Creation
✅ Post Scheduling
✅ Brand Strategy
✅ Audience Growth
✅ Instagram, Facebook, LinkedIn & more

💬 Interested? Reply *6* to talk to our team!
🌍 https://www.adigispark.in`);

    } else if (body === '2') {
        await msg.reply(`🌐 *Web Design & Development*

We build websites that don't just look great — they *convert visitors into customers!*

✅ Custom Website Design
✅ Mobile Responsive
✅ SEO Optimized
✅ Fast Loading
✅ E-Commerce Ready
✅ Landing Pages

💬 Interested? Reply *6* to talk to our team!
🌍 https://www.adigispark.in`);

    } else if (body === '3') {
        await msg.reply(`🤖 *Business Automation*

We automate your business processes to save time & money!

✅ WhatsApp Bot Setup (like this one!)
✅ CRM Automation
✅ Lead Follow-up Automation
✅ Email & Message Campaigns
✅ Workflow Automation

💬 Interested? Reply *6* to talk to our team!
🌍 https://www.adigispark.in`);

    } else if (body === '4') {
        await msg.reply(`🔗 *Networking & Outreach*

We connect your brand with the right people!

✅ LinkedIn Outreach
✅ Influencer Networking
✅ B2B Lead Generation
✅ Partnership Building
✅ Community Growth

💬 Interested? Reply *6* to talk to our team!
🌍 https://www.adigispark.in`);

    } else if (body === '5') {
        await msg.reply(`💰 *Pricing & Packages*

We offer flexible packages for every budget!

🥉 *Starter* — Perfect for small businesses
🥈 *Growth* — For brands ready to scale
🥇 *Pro* — Full-service digital domination

📩 For a custom quote tailored to your needs, reply *6* and our team will get back to you within 24 hours!

🌍 https://www.adigispark.in`);

    } else if (body === '6') {
        await msg.reply(`👤 *Connecting you to our team...*

Thank you for your interest in *Adigispark!* 🚀

Our team will reach out to you shortly. In the meantime:

🌍 Visit: https://www.adigispark.in
⏰ Working Hours: Mon–Sat, 9AM – 6PM

_"Your Growth, Our Mission"_ 💼`);
    }
});

const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<img src="${qrImageUrl}" style="width:150px;height:150px"/>`);
}).listen(PORT);

client.initialize();