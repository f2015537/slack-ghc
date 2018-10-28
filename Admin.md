### Deleting duplicate entries in the database (Admin must have MongoDB installed on their system)

 #### Step 1:- Starting the mongodb service
 Run the following command from your terminal

`sudo service mongod start`


#### Step 2:- Connect to mLab databse remotely using the mongo shell
Run the following command from your terminal with your credentials.

`mongo ds217131.mlab.com:17131/demo-inviter -u <dbuser> -p <dbpassword>`
 
 This will connect you to the mLab databse and will allow you to interact with the database from your terminal.
  
 #### Step 3:- Counting the number of entries in the users collection of the database.
 Run the following command `db.users.count()`.

This will return the number of users currently in the users collection of the database
 
 #### Step 4: - Deleting duplicate entries from the database's users collection
 Paste the following code in the mongo shell
 ```Javascript
db.users.aggregate([
 {
     "$group": {
         _id: {name: "$name"},
         dups: { $addToSet: "$_id" } ,
         count: { $sum : 1 }
     }
 },
 {
     "$match": {
         count: { "$gt": 1 }
     }
 }
]).forEach(function(doc) {
   doc.dups.shift();
   db.users.remove({
       _id: {$in: doc.dups}
   });
})
```
This will clean any duplicate entries in the database.

#### Step 5: - Counting the number of entries in the users collection again
Run `db.users.count()`

*Note that the value returned in this step will be <= the value returned in Step 3*

#### Step 6: Exit the mongo shell using `exit`

#### Step 7: Stopping the mongodb service

Run `sudo service mongod stop`
