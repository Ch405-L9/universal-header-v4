#!/bin/bash

# BADGRTechnologies Investor Portal - Complete Automated Setup
# Run: bash complete-setup.sh

echo "🚀 Creating BADGRTechnologies Investor Portal..."

cd ~/Desktop/investor-portal

# Create complete index.html with everything
cat > index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BADGRTechnologies LLC - Investor Portal</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/dsxpcwjwb/image/upload/v1759303879/favicon_ahsbt3.svg">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, Arial, sans-serif; background: #FFF; color: #000; line-height: 1.6; }
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 40px 20px; border-bottom: 3px solid #1E40AF; margin-bottom: 40px; }
        .header h1 { font-family: 'Goldman', Arial, sans-serif; font-weight: 700; font-size: 36px; color: #1E40AF; margin-bottom: 10px; }
        .header p { font-size: 18px; color: #666; }
        .section { margin-bottom: 60px; }
        .section-title { font-family: 'Goldman', Arial, sans-serif; font-weight: 700; font-size: 28px; color: #1E40AF; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E5E7EB; letter-spacing: 0.05em; }
        .business-plan { background: #F9FAFB; padding: 30px; border-radius: 2px; border: 1px solid #E5E7EB; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .business-plan h2 { font-size: 22px; color: #1E40AF; margin: 30px 0 15px 0; }
        .business-plan h2:first-child { margin-top: 0; }
        .business-plan p { margin-bottom: 15px; color: #374151; }
        .business-plan ul { margin-left: 30px; margin-bottom: 15px; }
        .business-plan li { margin-bottom: 8px; color: #374151; }
        .form-container { background: #FFF; padding: 30px; border: 2px solid #1E40AF; border-radius: 2px; }
        .form-container iframe { width: 100%; min-height: 800px; border: none; }
        .payment-section { text-align: center; background: #F9FAFB; padding: 40px; border-radius: 2px; }
        .qr-code { max-width: 300px; margin: 20px auto; padding: 20px; background: #FFF; border: 2px solid #1E40AF; }
        .qr-code img { width: 100%; height: auto; display: block; }
        .footer { margin-top: 80px; padding: 40px 0; border-top: 3px solid #1E40AF; text-align: center; }
        .signature-section img { max-width: 300px; height: auto; margin: 0 auto 20px; display: block; }
        .logo { max-width: 200px; height: auto; margin: 20px auto; display: block; }
        .disclaimer { background: #FEF3C7; border: 1px solid #F59E0B; padding: 20px; margin: 40px 0; font-size: 14px; color: #92400E; }
        .disclaimer strong { color: #78350F; display: block; margin-bottom: 10px; font-size: 16px; }
        @media (max-width: 768px) {
            .header h1 { font-size: 28px; }
            .section-title { font-size: 24px; }
            .business-plan, .form-container, .payment-section { padding: 20px; }
        }
    </style>
</head>
<body>
<script>
(function() {
    var correctPassword = "BadgrTech2025!";
    var maxAttempts = 3;
    var attempts = 0;
    if (sessionStorage.getItem('investorAuth') === 'true') { return; }
    document.body.style.display = 'none';
    function checkPassword() {
        var password = prompt("Enter password to access BADGRTechnologies Investor Portal:");
        if (password === null) { window.location.href = "https://badgrtech.com"; return; }
        if (password === correctPassword) {
            sessionStorage.setItem('investorAuth', 'true');
            document.body.style.display = 'block';
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                alert("Too many attempts. Redirecting.");
                window.location.href = "https://badgrtech.com";
            } else {
                alert("Wrong password. " + (maxAttempts - attempts) + " left.");
                checkPassword();
            }
        }
    }
    checkPassword();
})();
</script>
<div class="container">
    <div class="header">
        <h1>BADGRTECHNOLOGIES LLC</h1>
        <p>Investment Opportunity - Friends & Family</p>
    </div>
    <div class="section">
        <h2 class="section-title">BUSINESS PLAN</h2>
        <div class="business-plan">
            <h2>Executive Summary</h2>
            <p>BADGRTechnologies LLC is a full-stack web development company specializing in strategic digital solutions for ambitious small businesses. Operating from Atlanta, GA, we transform business potential into digital success through modern web technologies and strategic implementation.</p>
            <h2>Mission Statement</h2>
            <p>CTRL+ALT+Deliver - We provide full-stack solutions that empower small businesses to compete in the digital marketplace with enterprise-level capabilities at accessible price points.</p>
            <h2>Market Opportunity</h2>
            <p>The small business digital services market continues to expand as businesses increasingly recognize the necessity of professional web presence. Our positioning bridges the gap between template-based solutions and expensive agency work, offering custom development with strategic guidance.</p>
            <h2>Services Offered</h2>
            <ul>
                <li>Full-Stack Web Development - React, TypeScript, modern frameworks</li>
                <li>Performance Optimization - Lighthouse scores 95+ guaranteed</li>
                <li>Strategic Digital Consulting - Business-focused technical guidance</li>
                <li>Website Modernization - Transforming outdated sites into high-performance assets</li>
                <li>Technical SEO Implementation - Search optimization and analytics</li>
            </ul>
            <h2>Competitive Advantages</h2>
            <ul>
                <li>Technical expertise in modern development stack (React, TypeScript, Tailwind)</li>
                <li>Business strategy integration with technical execution</li>
                <li>Performance guarantees (Lighthouse 95+ or work continues at no cost)</li>
                <li>Local Atlanta presence with national service capability</li>
                <li>Founder-led development ensuring consistent quality</li>
            </ul>
            <h2>Financial Projections</h2>
            <p>We are seeking investment to expand service capacity, enhance marketing efforts, and scale operations. Conservative projections indicate profitability within 18 months based on current pipeline and market validation from initial client engagements.</p>
            <h2>Investment Use</h2>
            <ul>
                <li>Equipment & Development Tools: 30%</li>
                <li>Marketing & Business Development: 25%</li>
                <li>Team Expansion & Training: 25%</li>
                <li>Operations & Infrastructure: 20%</li>
            </ul>
            <h2>Leadership</h2>
            <p>Founded and led by Anthony Grant (CH405 / Chaos Line), combining technical expertise in full-stack development with business operations experience. Background includes field support engineering and enterprise-level technical implementations.</p>
            <h2>Contact Information</h2>
            <p>Email: hello@badgrtech.com<br>Phone: +1-404-423-5493<br>Address: 8735 Dunwoody Place, Suite N, Atlanta, GA 30350<br>Website: badgrtech.com</p>
        </div>
    </div>
    <div class="disclaimer">
        <strong>⚠️ Investment Disclaimer</strong>
        This investment opportunity is offered exclusively to friends and family. This is not a public offering and is not registered with the SEC. All investments carry risk. Invest only what you can afford to lose. BADGRTechnologies LLC makes no guarantees of returns. By investing, you acknowledge you have read and understand the business plan and associated risks.
    </div>
    <div class="section">
        <h2 class="section-title">EXPRESS YOUR INTEREST</h2>
        <div class="form-container">
            <p style="margin-bottom: 20px; color: #374151;">If you're interested in learning more or investing, please fill out the form below.</p>
            <iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" width="100%" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
    </div>
    <div class="section">
        <h2 class="section-title">INVESTMENT PAYMENT</h2>
        <div class="payment-section">
            <p style="font-size: 18px; margin-bottom: 20px;"><strong>Ready to invest?</strong></p>
            <p style="margin-bottom: 30px; color: #374151;">Scan the QR code below with your phone camera to send your investment via CashApp.</p>
            <div class="qr-code">
                <img src="cashapp-qr.png" alt="CashApp Payment QR Code">
            </div>
            <div class="payment-instructions">
                <p><strong>How to use:</strong></p>
                <p>1. Open your phone camera app</p>
                <p>2. Point at the QR code above</p>
                <p>3. Tap the notification that appears</p>
                <p>4. CashApp will open automatically</p>
                <p>5. Enter your investment amount and send</p>
            </div>
            <p style="margin-top: 30px; color: #666; font-size: 14px;">After sending payment, please fill out the form above.</p>
        </div>
    </div>
    <div class="footer">
        <div class="signature-section">
            <img src="signature.png" alt="Signature">
            <p style="margin-top: 10px;"><strong>Anthony Grant (CH405 / Chaos Line)</strong></p>
            <p>Founder & Lead Developer</p>
        </div>
        <img src="badge-logo.png" alt="BADGRTechnologies LLC" class="logo">
        <p style="margin-top: 20px; color: #666;">
            <a href="https://badgrtech.com" style="color: #1E40AF; text-decoration: none;">badgrtech.com</a>
        </p>
        <p style="color: #666; margin-top: 10px; font-size: 14px;">
            &copy; 2025 BADGRTechnologies LLC. All rights reserved.
        </p>
    </div>
</div>
</body>
</html>
HTMLEOF

echo "✅ Complete index.html created"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "                  SETUP COMPLETE!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "✅ Full document created - NOT blank"
echo "✅ Fillable form included (Google Form iframe)"
echo "✅ All sections placed correctly"
echo "✅ Password protection active (default: BadgrTech2025!)"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. ADD YOUR 3 IMAGES to this folder:"
echo "   - cashapp-qr.png"
echo "   - signature.png"
echo "   - badge-logo.png"
echo ""
echo "2. EDIT index.html (2 quick changes):"
echo "   - Line 26: Change password if desired"
echo "   - Line 112: Replace YOUR_FORM_ID with real Google Form ID"
echo ""
echo "3. TEST LOCALLY:"
echo "   python3 -m http.server 8000"
echo "   Open: http://localhost:8000"
echo ""
echo "4. DEPLOY:"
echo "   vercel --prod"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Password: BadgrTech2025! (change on line 26)"
echo "Ready to test!"
