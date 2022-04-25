let vpW,vpH
let canv,wolfenstein,wolfensteinW,wolfensteinH
let start
let totalRows,totalCols,ind
let skipRows = 8
let skipCols = 15
let width
let current
let angle = 0
let stack = []
let boundaries = []
let wall_conditions = []
let walls = []
let player_loc = []
let player_square = []
let flag = false
let colors = ['#02FDA4','#2702FD' ] //,'#D8FD02'
let color_random = new Array(301)
function setup() {
  pixelDensity(1)
  // frameRate(60)
  background(0);
  vpW = floor(windowWidth*0.96)
  vpH = floor(windowHeight*0.92)
  canv = createCanvas(vpW, vpH);
  canv.position(windowWidth*0.02,windowHeight*0.075)
  for(let i=0; i<301; i++){
    color_random[i] = colors[floor(random(0,colors.length))]
  }
  for(let i=50; i>=30; i--){
    if((vpW%i >=10 && vpW%i <= 40) && (vpH%i >= 10 && vpH%i <= 40)){
      width = i
      totalRows = floor(vpH/width)
      totalCols = floor(vpW/width)
      break
    }
  }
  wolfensteinW = width*16
  wolfensteinH = width*9
  wolfenstein = createGraphics(wolfensteinW,wolfensteinH)
  wolfenstein.background(0)
  
  m = new Maze(vpW,vpH,width)
  start = m.generateGrid()
  current = start
  while(true){
    let next = m.generateMaze(current)
    if(next){
      stack.push(current)
      current = next
    }
    else{
      if(stack.length>0){
        current = stack.pop()
      }
      else{
          boundaries = [...m.exportMaze()[0]]
          wall_conditions = m.exportMaze()[1]
          break
      }
    }
  }
  for(let i=0; i<boundaries.length; i++){
    walls[i] = new Boundary(boundaries[i][0],boundaries[i][1],boundaries[i][2],boundaries[i][3])
  }
  start = start.map(x => (x*width)+(width/2))
  player_loc = start
  player = new Player([start[1],start[0]])
}

let index = (i,j) =>{
  if(i<0 || j<0 || i>totalRows-1 || j>totalCols-1){
      return -1
  }
  if(i>=0 && i<skipRows+1 && j>skipCols){
      return((i*(totalCols-skipCols-1))+(j-skipCols)-1)
  }
  if(i>skipRows){
      return((i*totalCols)+j - ((skipCols+1)*(skipRows+1)))
  }
}

function draw() {
  background(0);
  wolfenstein.background(0)
  for(let wall of walls){
    wall.show()
  }
  player_square = player_loc.map(x => floor(x/width))
  ind = index(player_square[0],player_square[1])
  let xll,xhl,yll,yhl
  xll=xhl=yll=yhl = -1
  if(wall_conditions[ind][0]){
    yll = player_square[0]*width 
  }
  else{
    yll = (player_square[0]-1)*width 
  }
  if(wall_conditions[ind][2]){
    yhl = (player_square[0]+1)*width
  }
  else{
    yhl = (player_square[0]+2)*width 
  }
  if(wall_conditions[ind][1]){
    xhl = (player_square[1]+1)*width
  }
  else{
    xhl = (player_square[1]+2)*width
  }
  if(wall_conditions[ind][3]){
    xll = (player_square[1])*width
  }
  else{
    xll = (player_square[1]-1)*width
  }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
    player.rotate(1.5)
    angle = (angle-1.5)%360
  }
  else if(keyIsDown(65) || keyIsDown(LEFT_ARROW)){
    player.rotate(-1.5)
    angle = (angle+1.5)%360
  }
  if(keyIsDown(87) || keyIsDown(UP_ARROW)){ //w
    player_loc[1] = player_loc[1]+(1*cos(radians(angle)))
    if(player_loc[1]<=(xll+8)){
      player_loc[1]=xll+8
    }
    if(player_loc[1]>=(xhl-8)){
      player_loc[1]=xhl - 8
    }
    
    player_loc[0] = player_loc[0]-(1*sin(radians(angle)))
    if(player_loc[0]<=(yll+8)){
      player_loc[0]=yll+8
    }
    if(player_loc[0]>=(yhl-8)){
      player_loc[0]=(yhl-8)
    }
  }
  else if(keyIsDown(83) || keyIsDown(DOWN_ARROW)){ //s
    player_loc[1] = player_loc[1]-(1*cos(radians(angle)))
    if(player_loc[1]<=(xll+8)){
      player_loc[1]=xll+8
    }
    if(player_loc[1]>=(xhl-8)){
      player_loc[1]=xhl - 8
    }
    player_loc[0] = player_loc[0]+(1*sin(radians(angle)))
    if(player_loc[0]<=(yll+8)){
      player_loc[0]=yll+8
    }
    if(player_loc[0]>=(yhl-8)){
      player_loc[0]=(yhl-8)
    }
  }

  player.update(player_loc[1], player_loc[0])
  player.show()
  let scene = player.look(walls)
  let k = -30
  scene = scene.map(x=> x*6*cos(radians(k-=0.2)))
  const w = wolfensteinW/scene.length
  // console.log(scene.length)
  for(let i=0; i<scene.length; i++){
    wolfenstein.noStroke()
    const sq = scene[i]*scene[i]
    const wSq = (totalCols+1)*(totalCols+1)*width*width
    const b = map(sq,0,wSq,255,0)
    
    const h = map(scene[i],0,(totalCols+1)*width,wolfensteinH*0.8,0)
    if(flag){
      wolfenstein.fill(color_random[i])
    }
    else{
      wolfenstein.fill(b)
    }
    wolfenstein.rectMode(CENTER)
    wolfenstein.rect(i*w + w/2, wolfensteinH/2 , w+1, h)
  }
  // console.log(getFrameRate())
  image(wolfenstein,0,0)
  
}
let angleFlag = true
function keyPressed(e){
  // console.log(e)
  if(key == 't'){
    if(flag){
      flag = false
    }
    else{
      flag = true
    }
  }
  if(key == 'd' || key == 'a' || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)){
    if(angleFlag){
      angle = -30
      angleFlag = false
    }
  }
}
let x=1
function mouseWheel(event){
  x++
  if(x%6 == 0){
    if(flag){
      flag = false
    }
    else{
      flag = true
    }
    // console.log(flag)
  }
  
}


