

function CanvasChart($id) {
  this.$id = $id.get()[0];
  this.data = [];
  this.dataOffset = 0;
  this.options = {
    bgColor: "#AAA"
  };
  this.lineOffset = 0;
}

CanvasChart.prototype.addValue = function(val) {
  this.data.push(val);
  this.update();
};

CanvasChart.prototype.update = function() {
  var canvas = this.$id;
  var width = canvas.width;
  var height = canvas.height;

  if (canvas.getContext && this.data.length > 0) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(0,0, width, height);

    var pointCount = Math.min(10, this.data.length);
    // var stepWidth = width / pointCount;
    var stepWidth = 10;
    ctx.moveTo(stepWidth * this.data.length-1, this.data[i]);

    ctx.beginPath();
    for (var i = this.data.length, min = Math.max(0, this.data.length - pointCount); i>min; ) {
      i -= 1;
      ctx.lineTo(stepWidth * i, this.data[i]);
    }
    ctx.stroke();
  }

};
