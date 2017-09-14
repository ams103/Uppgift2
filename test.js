var arDrone = require('ar-drone');
var client = arDrone.createClient();
client.config('general:navdata_demo', 'FALSE');

client.takeoff();
client
  .after(5000, function(){
    this.front(1);
  })
  .after(3000, function(){
    this.stop();
    this.land();
  })
  .after(3000, function(){
    client.takeoff();
  })
  .after(5000, function(){
    this.counterClockwise(0.3);
  })
  .after(3000, function(){
    this.stop();
    this.land();
  })

  .after(4000, function(){
    client.takeoff();
  })
  /*
  .after(3000, function(){
    this.animate('flipBehind', 1000);
  })
  .after(1000, function(){
    this.stop();
    this.land();
  })*/

  .after(4000, function(){
    this.front(0.2);
  })
  .after(2500, function(){
    this.stop();
    this.land();
  });
