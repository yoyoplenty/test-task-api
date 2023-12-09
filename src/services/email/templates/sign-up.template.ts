export function signupEmail(userName: string, activateLink: string) {
  return `<!DOCTYPE html>
  <html
	lang="en"
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:o="urn:schemas-microsoft-com:office:office"
  >
	<head>
	  <meta charset="UTF-8" />
	  <meta name="viewport" content="width=device-width,initial-scale=1" />
	  <meta name="x-apple-disable-message-reformatting" />
	  <title></title>
	  <!--[if mso]>
		<noscript>
		  <xml>
			<o:OfficeDocumentSettings>
			  <o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		  </xml>
		</noscript>
	  <![endif]-->
	  <style>
		table,
		td,
		div,
		h1,
		p {
		  font-family: Arial, sans-serif;
		}
	  </style>
	</head>
	<body style="margin: 0; padding: 0">
	  <table
		role="presentation"
		style="
		  width: 100%;
		  border-collapse: collapse;
		  border: 0;
		  border-spacing: 0;
		  background: #ffffff;
		"
	  >
		<tr>
		  <td align="center" style="padding: 0">
			<table
			  role="presentation"
			  style="
				width: 602px;
				border-collapse: collapse;
				border: 1px solid #cccccc;
				border-spacing: 0;
				text-align: left;
			  "
			>
			  <tr>
				<td
				  align="center"
				  style="padding: 15px 0 15px 0; background: #010137"
				>
				  <img
					src="https://i.ibb.co/pwrXhHX/logo.png"
					alt=""
					width="150"
					style="height: auto; display: block"
				  />
				</td>
			  </tr>
			  <tr>
				<td style="padding: 36px 30px 42px 30px">
				  <table
					role="presentation"
					style="
					  width: 100%;
					  border-collapse: collapse;
					  border: 0;
					  border-spacing: 0;
					"
				  >
					<tr>
					  <td align="center">
						<img
						  src="https://i.ibb.co/Wsq3y0M/verify-mail.png"
						  alt="verify-mail"
						  width="150px"
						  style="margin: 20px 0 30px 0"
						/>
					  </td>
					</tr>
					<tr>
					  <td style="padding: 0 0 36px 0; color: #010137">
						<h1
						  style="
							font-size: 24px;
							margin: 0 0 20px 0;
							font-family: Arial, sans-serif;
							text-align: center;
						  "
						>
						  Verify Your Email Address
						</h1>
						<p
						  style="
							margin: 0;
							font-size: 16px;
							line-height: 24px;
							font-family: Arial, sans-serif;
						  "
						>
						  Hey <b>${userName}</b>,
						</p>
						<br />
						<p
						  style="
							margin: 0 0 12px 0;
							font-size: 16px;
							line-height: 24px;
							font-family: Arial, sans-serif;
						  "
						>
						  Welcome on board! You’re almost ready to start enjoying
						  Easyflip. We need you to simply click the button below
						  to verify your email.
						</p>
					  </td>
					</tr>
					<tr>
					  <td>
						<div style="text-align: center; margin-bottom: 2rem">
						  <a
							href="${activateLink}"
							style="
							  cursor: pointer;
							  padding: 1rem 2rem;
							  display: inline-block;
							  margin: 1.5rem 0 0;
							  outline: none;
							  border: none;
							  color: #ffffff;
							  background: #010137;
							  font-weight: 500;
							  font-size: 18px;
							  border-radius: 4px;
							  letter-spacing: 2px;
							"
							>Verify Your Mail</a
						  >
						</div>
						<p style="text-align: center; font-size: 12px">
						  Questions or Feedback? Write to us anytime at
						  <a style="color: #d45d58" href="mailto:info@easyflip.ng"
							>info@easyflip.ng</a
						  >
						  or check our
						  <a style="color: #d45d58" href="easyflip.ng/faq"
							>FAQs!</a
						  >
						</p>
					  </td>
					</tr>
					<tr>
					  <td style="padding: 0">
						<table
						  role="presentation"
						  style="
							width: 100%;
							border-collapse: collapse;
							border: 0;
							border-spacing: 0;
							margin-top: 20px;
						  "
						>
						  <tr>
							<td
							  style="
								width: 260px;
								padding: 0;
								vertical-align: top;
								color: #010137;
							  "
							>
							  <a
								href="https://play.google.com/store/apps/details?id=com.easyflipMobile"
								style="
								  margin: 0 0 25px 0;
								  font-size: 16px;
								  line-height: 24px;
								  font-family: Arial, sans-serif;
								"
							  >
								<img
								  src="https://i.ibb.co/4gs91wC/download-it.png"
								  alt="download-it"
								  width="260px"
								  style="height: auto; display: block"
								/>
							  </a>
							</td>
							<td
							  style="
								width: 20px;
								padding: 0;
								font-size: 0;
								line-height: 0;
							  "
							>
							  &nbsp;
							</td>
							<td
							  style="
								width: 260px;
								padding: 0;
								vertical-align: top;
								color: #010137;
							  "
							>
							  <a
								href="https://play.google.com/store/apps/details?id=com.easyflipMobile"
								style="
								  margin: 0 0 25px 0;
								  font-size: 16px;
								  line-height: 24px;
								  font-family: Arial, sans-serif;
								"
							  >
								<img
								  src="https://i.ibb.co/rxFGdD3/get-it.png"
								  alt="get-it"
								  width="260px"
								  style="height: auto; display: block"
								/>
							  </a>
							</td>
						  </tr>
						</table>
					  </td>
					</tr>
					<tr>
					  <td align="center">
						<p
						  style="
							margin: 50px 0 0 0;
							color: #010137;
							font-family: 'Open Sans', 'Helvetica Neue',
							  'Helvetica', Helvetica, Arial, sans-serif;
							font-weight: 300;
							font-size: 12px;
							margin-bottom: 5px;
						  "
						>
						  <a
							style="
							  box-sizing: border-box;
							  color: #348eda;
							  font-weight: 400;
							  text-decoration: none;
							  font-size: 12px;
							  padding: 0 5px;
							"
							target="_blank"
							href="https://wa.me/07052159390?text=Trade%20your%20Bitcoin%20and%20Giftcard%20for%20Cash.%0AWe%20created%20a%20seamless%20experience%20for%20you%20to%20trade%20bitcoin%20and%20giftcard%20conveniently%20with%20our%20mobile%20app."
							><img
							  src="https://i.ibb.co/h9fnGLx/mail-whatsapp.png"
							  alt="mail-whatsapp"
							  border="0"
						  /></a>
						  <a
							style="
							  box-sizing: border-box;
							  color: #348eda;
							  font-weight: 400;
							  text-decoration: none;
							  font-size: 12px;
							  padding: 0 5px;
							"
							target="_blank"
							href="https://www.facebook.com/easyflipng/?ref=page_internal"
							><img
							  src="https://i.ibb.co/1Ks4mWM/social-fb.png"
							  alt="social-fb"
							  border="0"
						  /></a>
						  <a
							style="
							  box-sizing: border-box;
							  color: #348eda;
							  font-weight: 400;
							  text-decoration: none;
							  font-size: 12px;
							  padding: 0 5px;
							"
							target="_blank"
							href="https://www.instagram.com/easyflipng/"
							><img
							  src="https://i.ibb.co/1sG2GcV/social-insta.png"
							  alt="social-insta"
							  border="0"
						  /></a>
						</p>
  
						<p
						  style="
							margin: 0;
							color: #010137;
							font-family: 'Open Sans', 'Helvetica Neue',
							  'Helvetica', Helvetica, Arial, sans-serif;
							font-weight: 300;
							font-size: 12px;
							margin-bottom: 5px;
						  "
						>
						  © 2021 EasyFlip. All rights reserved
						</p>
					  </td>
					</tr>
				  </table>
				</td>
			  </tr>
			</table>
		  </td>
		</tr>
	  </table>
	</body>
  </html>
  `;
}
