## Client Side DB
Client Side DB is a wrapper for the [Web SQL Database](http://dev.w3.org/html5/webdatabase/) that makes it easy to add a database, create a table, insert rows, get rows, and run queries.

### The Basics

	/**
	 * Create the database
	 *
	 * @param Name (required)
	 * @param Version (required)
	 * @param Description (required)
	 * @param Estimated Size (optional)
	*/
	var db = new ClientSideDB('Database Name', '1.0', 'This is my database');
	
	// Make sure the database is available (supported by the browser)
	if( db.isAvailable ) {
		
		/**
		 * Create the table
		 *
		 * @param Name (required)
		 * @param Fields (required)(array)
		*/
		db.createTable('users', ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'name', 'email']);
		
		/**
		 * Insert our first row
		 *
		 * @param Table (required)
		 * @param Values (required)(object)
		 *
		 * @note We don't have to supply the id because we set it to be auto incremental
		*/
		db.insert('users', {
			name: 'Baylor',
			email: 'baylor@example.com'
		});
		
		/**
		 * Get rows from the database
		 *
		 * @param Table (required)
		 * @param Columns (optional)(array) (default: *)
		 * @param Success function (optional)
		 * @param Error function (optional)
		*/
		db.get('users', ['name', 'email'], function(tx, results) {
			
			// Loop through the results
			for( var i = 0, len = results.rows.length; i < len; i++ ) {
				
				// Get the current result
				var row = results.rows.item(i);
				
				// Log the name and email address
				console.log(row.name, row.email);
			}
		});
		
		/**
		 * Run a raw query
		 *
		 * @param Query (required)
		 * @param Args (required)(array)
		 * @param Success function (optional)
		 * @param Error function (optional)
		*/
		db.query('DROP TABLE users', [], function() {
			alert('Dropped the table users');
		});
	}
	
### Notes
I'm not a great javascript developer, so this wrapper probably has a lot of inefficient code. And if you see something that can be improved, please let me know. Also, [Web SQL Database](http://dev.w3.org/html5/webdatabase/) is based on [SQLite](http://www.sqlite.org/).