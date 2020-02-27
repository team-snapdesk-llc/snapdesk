const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var io = require('socket.io')(server);
const app = express();
var server = require('http').Server(app);

// server port
const PORT = 3000;

/**
 * REQUIRE IN ROUTERS HERE
 */

const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');

/**
 * Handle parsing of the body and cookies
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 *  Route handlers
 */

app.use('/api', apiRouter);
app.use('/login', loginRouter);

// handle static files
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../img')));

// response with main app
if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));
}

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred. Check server logs for detials.' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * Start server
 */
// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });

server.listen(PORT, () => console.log('express server running.'));

/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connections = [];
io.on('connection', function (socket) {
	console.log("Connected to Socket - "+ socket.id)	
	connections.push(socket)
	socket.on('disconnect', function(){
		console.log('Disconnected - '+ socket.id);
	});
	
	socket.on('postTicket',(ticket)=>{
    //add logic to add a new ticket to the DB 
    const { snaps_given, mentee_id, status, message, room_id } = ticket;
    const postTicket = {
      text: `
        INSERT INTO tickets
        (snaps_given, mentee_id, status, message, timestamp, room_id)
        VALUES
        ($1, $2, $3, $4, NOW(), $5)
        RETURNING _id, timestamp, mentee_id;
      `,
      values: [snaps_given, mentee_id, status, message, room_id]
    };

    db.query(postTicket)
      .then(result => {
        ticket.roomId = result.rows[0].room_id;
        ticket.messageInput = result.rows[0].message;
        ticket.messageRating = result.rows[0].snaps_given;
        ticket.ticketId = result.rows[0]._id;
        ticket.timestamp = result.rows[0].timestamp;
        ticket.menteeId = result.rows[0].mentee_id;
        connections.forEach((currentConnection)=>{
					currentConnection.emit('ticketPosted', ticket)
				})
        io.emit('ticketPosted', ticket);
      })
      .catch(err =>
        next({
          log: `Error in postTicket socket: ${err}`
        })
      );

    // var todoItem = new todoModel({
    // 	itemId:addData.id,
		// 	item:addData.item,
		// 	completed: addData.completed
		// })

		// todoItem.save((err,result)=> {
		// 	if (err) {console.log("---Gethyl ADD NEW ITEM failed!! " + err)}
		// 	else {
		// 		// connections.forEach((currentConnection)=>{
		// 		// 	currentConnection.emit('ticketAdded',addData)
		// 		// })
		// 		io.emit('ticketAdded',addData)
				
		// 		console.log({message:"+++Gethyl ADD NEW ITEM worked!!"})
		// 	}
		// })
	})

	// socket.on('changeStatus',(markedItem)=>{
	// 	var condition   = {itemId:markedItem.id},
	// 		updateValue = {completed:markedItem.completed}

	// 	todoModel.update(condition,updateValue,(err,result)=>{
	// 		if (err) {console.log("---Gethyl MARK COMPLETE failed!! " + err)}
	// 		else {
	// 			// connections.forEach((currentConnection)=>{
	// 			// 	currentConnection.emit('statusChanged',markedItem)
	// 			// })
	// 			io.emit('statusChanged',markedItem)

	// 			console.log({message:"+++Gethyl MARK COMPLETE worked!!"})
	// 		}
	// 	})
	// })
	
});