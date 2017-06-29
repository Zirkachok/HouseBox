import web # lpthw.web lib


urls = (
	'/hello', 'Index'
)


app = web.application(urls, globals())

render = web.template.render('templates/')

class Index(object):
	def GET(self):
		form = web.input(name="Nobody")
		greeting = "Hello, %s" % form.name

		return render.index(greeting = greeting)

if __name__ == "__main__":
	app.run()


# Install web lib : https://stackoverflow.com/questions/9305316/python-import-web-not-working