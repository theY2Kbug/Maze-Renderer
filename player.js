class Player{
    constructor(start){
        this.pos = createVector(start[0], start[1])
        this.rays = []
        this.heading = 0
        for(let a=-30; a<30; a+=0.1){
            this.rays.push(new Ray(this.pos, radians(a)))
        }
    }

    show(){
        fill('#f000ff')    
        noStroke()
        ellipse(this.pos.x,this.pos.y,16)
        fill(255)
        for(let ray of this.rays){
        }
    }

    rotate(angle){
        this.heading += angle
        for(let i=0; i<this.rays.length; i+=1){
            this.rays[i].setAngle(radians((i*0.1)+this.heading))
        }
    }

    update(x,y){
        this.pos.set(x,y)
    }
    look(walls){
        const scene = []
        const wall_shading = []
        for(let i=0; i<this.rays.length; i++){
            const ray = this.rays[i]
            let closest = null
            let record = Infinity
            for (let wall of walls){
                
                const pt = ray.cast(wall)
                if(pt){
                    let d = p5.Vector.dist(this.pos,pt)
                    if(d<record){
                        record = d
                        closest = pt
                    }
                }
            }
            if(closest){
                stroke(255, 255, 180 )
                if(closest.x-Math.floor(closest.x) === 0){
                    wall_shading[i] = 'v'
                }
                else{
                    wall_shading[i] = 'h'
                }
                line(this.pos.x, this.pos.y, closest.x, closest.y)
                
            }
            scene[i] = record
        }
        return [scene,wall_shading]
    }
}