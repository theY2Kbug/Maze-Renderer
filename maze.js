class Maze{
    constructor(canvW, canvH,w){
        this.width = w
        this.totalCols = floor(canvW/this.width)
        this.totalRows = floor(canvH/this.width)
        this.skipCols = 15
        this.skipRows = 8
        this.visited = new Set()
        this.walls = []
        this.grid = []
    }
    
    
    
    generateGrid(){
        for(let i=0; i<this.totalRows; i++){
            for(let j=0; j<this.totalCols; j++){
                if(i<=this.skipRows && j<=this.skipCols){
                    continue
                }
                else{
                    let cell = [i,j]
                    this.grid.push(cell)
                }
            }
        }
        this.walls = this.grid.map(() => {
            return [true,true,true,true]
        })
        let rand_start = floor(random(0,this.grid.length))
        return this.grid[rand_start]
    }

    generateMaze(current){
        if(!this.visited.has(current)){
            noStroke()
            fill('rgba(228,233,237,0.75)')
            rect(current[1]*this.width,current[0]*this.width,this.width,this.width)
            this.visited.add(current)
        }
        let neighbours = []
        let index = (i,j) =>{
            if(i<0 || j<0 || i>this.totalRows-1 || j>this.totalCols-1){
                return -1
            }
            if(i>=0 && i<this.skipRows+1 && j>this.skipCols){
                return((i*(this.totalCols-this.skipCols-1))+(j-this.skipCols)-1)
            }
            if(i>this.skipRows){
                return((i*this.totalCols)+j - ((this.skipCols+1)*(this.skipRows+1)))
            }
        }
        let current_index = index(current[0],current[1])
        let top_index = index(current[0]-1,current[1])
        let right_index = index(current[0],current[1]+1)
        let bottom_index = index(current[0]+1,current[1])
        let left_index = index(current[0],current[1]-1)
        let top = this.grid[top_index]
        let right = this.grid[right_index]
        let bottom = this.grid[bottom_index]
        let left = this.grid[left_index]
        if(top && !this.visited.has(top)){
            neighbours.push(top)
        }
        if(right && !this.visited.has(right)){
            neighbours.push(right)
        }
        if(bottom && !this.visited.has(bottom)){
            neighbours.push(bottom)
        }
        if(left && !this.visited.has(left)){
            neighbours.push(left)
        }
        if(neighbours.length > 0){
            let r = floor(random(0,neighbours.length))
            let x = current[0] - neighbours[r][0]
            let y = current[1] - neighbours[r][1]
            if(y == 1){
                this.walls[current_index][3] = false
                this.walls[left_index][1] = false
            } 
            else if(y == -1){
                this.walls[current_index][1] = false
                this.walls[right_index][3] = false
            }
            if(x == 1){
                this.walls[current_index][0] = false
                this.walls[top_index][2] = false
            } 
            else if(x == -1){
                this.walls[current_index][2] = false
                this.walls[bottom_index][0] = false
            }
            return neighbours[r]
        }
        else{
            return undefined
        }
    }

    exportMaze(){
        let boundaries = new Set()
        for(let i=0; i<this.walls.length; i++){
            let x = this.grid[i][1]*this.width
            let y = this.grid[i][0]*this.width
            if(this.walls[i][0]){
                boundaries.add([x,y,x+this.width,y])
            }
            if(this.walls[i][1]){
                boundaries.add([x+width,y,x+this.width,y+width])
            }
            if(this.walls[i][2]){
                boundaries.add([x+width,y+this.width,x,y+width])
            }
            if(this.walls[i][3]){
                boundaries.add([x,y+this.width,x,y])
            }
        }
        return [boundaries,this.walls]
    }
    
    
}