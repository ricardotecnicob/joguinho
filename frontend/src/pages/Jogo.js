import React, { Component } from 'react';
import  "../assets/css/Jogo.css";
import carro from '../assets/images/carro.png';
import api from '../services/api';

class Jogo  extends Component{

  render(){

    var myGamePiece;
    var ctx;
    var myObstacles = [];
    var myScore;

    window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = "keydown";         
    })


    function startGame() {

        const author = localStorage.getItem('@JOGADOR:username');

        if(!author){
            window.location.href ='/';
        }

        myGamePiece = new component(60, 30, carro, 10, 120, "image");
        myScore = new component("30px", "Consolas", "black", 280, 40, "text");
        myGameArea.start();
    }

    var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 800;
            this.canvas.height = 500;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
            })
            window.addEventListener('keyup', function (e) {
                myGameArea.keys[e.keyCode] = (e.type == "keydown");            
            })
            },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop : async function() {
            clearInterval(this.interval);
            
            //Atualizar pontos

            const id = localStorage.getItem('@JOGADOR:username');
            const pontos = parseInt(myGameArea.frameNo);

            await api.post(`users/${id}/${pontos}`);
            

        }
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image") {
        this.image = new Image();
        this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;    
        this.x = x;
        this.y = y;    
        this.update = function() {
            ctx = myGameArea.context;
            if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
            }else if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
                
                ctx = myGameArea.context;
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);

                this.x += this.speedX;
                this.y += this.speedY;   
            }
        }
        this.newPos = function() {
            this.x += this.speedX;
            this.y += this.speedY;        
        }
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
    }

    function updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap, i;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                return;
            } 
        }
        myGameArea.clear();

        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;    
        if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
        if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
        if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
        if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }

        myGameArea.frameNo += 1;
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(150, height, "green", x, 0));
            myObstacles.push(new component(150, x - height - gap, "green", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].speedX = -1;
            myObstacles[i].newPos();
            myObstacles[i].update();
        }
        myScore.text="PONTOS: " + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();    
        myGamePiece.update();
    }

    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
    }

    function moveup() {
        myGamePiece.speedY = -1; 
    }

    function movedown() {
        myGamePiece.speedY = 1; 
    }

    function moveleft() {
        myGamePiece.speedX = -1; 
    }

    function moveright() {
        myGamePiece.speedX = 1; 
    }

    function clearmove() {
        myGamePiece.speedX = 0; 
        myGamePiece.speedY = 0; 
    }

    return (
        <div className="cssDivPrincipal">
          <div onLoad={startGame()}>
              
          </div>
          <div className="botoesMover">
          {/* <button onMouseDown={moveup()} onMouseUp={clearmove()} onTouchStart={moveup()}>UP</button><br/><br/> */}
          {/* <button onMouseDown={moveleft()} onMouseUp={clearmove()} onTouchStart={moveleft()}>LEFT</button> */}
          {/* <button onMouseDown={moveright()} onMouseUp={clearmove()} onTouchStart={moveright()}>RIGHT</button><br/><br/> */}
          {/* <button onMouseDown={movedown()} onMouseUp={clearmove()} onTouchStart={movedown()}>DOWN</button> */}
          </div>
        </div>
    );
    
  }

}

export default Jogo;