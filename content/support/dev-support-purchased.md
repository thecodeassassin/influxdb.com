+++
title = "Developer Support Purchased"
+++

# Thank you!

You have successfully signed up for the Developer Support Plan.

Emails sent to [support@influxdb.com](mailto:support@influxdb.com) originating from <b><span id="dev-support-email"></span></b> will be addressed within six business hours. Business hours are 8am to 8pm PST.

Receipts will automatically be emailed every month to <b><span id="dev-support-email-receipt"></span></b>.

Please [email support](mailto:support@influxdb.com) for all account administration requests, such as,

- requesting receipts be sent to a different email
- changing the email address that will receive support
- changing your subscription

## Resources

While we'll be available to answer any questions, there are a number of other ways to connect and learn about InfluxDB.

- Sign up for updates <a href="https://errplane.us5.list-manage.com/subscribe/?u=4d17b6adac2728b1ea6e4926b&id=08af34971b" target="_blank">on the InfluxDB newsletter</a>.
- Join the [mailing list for users and developers](https://groups.google.com/forum/#!forum/influxdb).
- Read the [documentation](http://localhost:1313/docs/v0.9/introduction/overview.html).
- Find answers to specific questions on the [help desk](http://support.influxdb.com/hc/en-us).
- Follow [@influxdb](https://twitter.com/influxdb) on twitter.
- Find us on freenode in #influxdb.
- Log issues on [GitHub](https://github.com/influxdb/influxdb/issues).
- Check out the [source code](https://github.com/influxdb).

<script type="text/javascript">
email_div = document.getElementById("dev-support-email");
email_div_receipt = document.getElementById("dev-support-email-receipt");
if(window.location.hash) {
	var hash = window.location.hash.substring(1);
	email_div.innerHTML = hash
	email_div_receipt.innerHTML = hash
} else {
	email_div.innerHTML = "your email"
	email_div_receipt.innerHTML = "the address on file"
}
</script>