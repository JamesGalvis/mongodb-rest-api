import app from './app'
import './db'

// server execution
app.listen(app.get('port'), () =>
  console.log(`server running on port ${app.get('port')}`)
)
