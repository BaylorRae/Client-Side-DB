function ClientSideDB(name, version, displayName, estimatedSize) {
  this.db = null;
  this.isAvailable = window.openDatabase ? true : false;
  
  if( this.isAvailable )
    this.db = window.openDatabase(name, version, displayName, estimatedSize);
}

ClientSideDB.prototype = {  
  createTable: function(name, fields) {
    fields = '(' + fields.join(',') + ')';
    var self = this;

    this.db.transaction(function(tx) {

      // See if we can get rows from the table
      // else, create table
      
      this.query('SELECT * FROM ' + name, [], function() {}, function(tx) {
        this.query('CREATE TABLE ' + name + ' ' + fields, []);
      });

    });
  },
  
  insert: function(table, data, success, error) {
    var columns = [], fields = [], values = [];
    
    for( col in data ) {
      fields.push(col);
      columns.push('?');
      values.push(data[col]);
    }

    fields = '(' + fields.join(',') + ')';
    columns = '(' + columns.join(',') + ')';


    this.query('INSERT INTO ' + table + ' ' + fields + ' VALUES ' + columns, values, success, error);
  },
  
  get: function(table, cols, success, error) {
    var columns = (cols != null && cols != '') ? cols.join(',') : '*',
        query = 'SELECT ' + columns + ' FROM ' + table;

    this.query(query, [], success, error);    
  },
  
  query: function(query, args, success, error) {
    
    this.db.transaction(function(tx) {
      tx.executeSql(query, args, success, error);
    });
  }
}