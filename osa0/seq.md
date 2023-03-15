sequenceDiagram
	participant browser
	participant server

	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	server-->>browser: Redirection with code 302 and /exampleapp/notes

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	activate server
	server-->>browser: basis html of the site
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    	activate server
    	server-->>browser: css file for the style/layout of the site
    	deactivate server
    
    	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    	activate server
    	server-->>browser: main.js, the browser side script
    	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server-->>browser: notes in a json file
	deactivate server

	browser->>server GET https://studies.cs.helsinki.fi/favicon.ico
	activate server 
