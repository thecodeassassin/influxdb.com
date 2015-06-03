+++
title = "contact"
layout = "sidebar"
+++
<h1 class="docs header">Contact Us</h1>

<form class="contact-form">

	<p>
		<label for="name">Name</label>
		<input required type="text" name="name" placeholder="name" />
	</p>
	
	<p>
		<label for="email">Email</label>
		<input required type="email" name="email" placeholder="email address" />
	</p>
	
	<p>
		<label for="company">Company</label>
		<input type="text" name="company" id="company" placeholder="company" />
	</p>
	
	<p>
		<label for="message">Message</label>
		<textarea required type="text" name="message" id="message" placeholder="type your message here"></textarea>
	</p>
	
	<p>
		<label for="subject">Inquiring about:</label>
		<select name="subject" id="subject">
			<option>General Inquiry</option>
			<option>Hosting</option>
			<option>Support</option>
		</select>
	</p>
	
	<p>
		<input type="checkbox" name="newsletter" id="newsletter" />
		<label for="newsletter">Sign up to receive InfluxDB updates via email</label>
	</p>
	
	<p>
		<input type="submit" />
	</p>

</form>