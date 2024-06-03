import React from 'react'
import './TicTacToe.css'
import circle from '../Assets/circle.png'
import cross from '../Assets/cross.png'
import { useState, useRef } from 'react'

let data = ["","","","","","","","","",]
let prevStack = []
let nextStack = []
function TicTacToe() {

    let [count,setCount] = useState(0);
    let [lock,setLock] = useState(false);
    let titleRef = useRef(null);
    let [gameWon, setGameWon] = useState(false);
    let textRef = useRef(null);

    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);
    
    let box_array =[box1,box2,box3,box4,box5,box6,box7,box8,box9];
    const prev = () => {
        if(prevStack.length > 0){
            let lastStackIndex = prevStack.pop();
            nextStack.push(lastStackIndex);
            box_array[lastStackIndex].current.innerHTML = "";
        }
    }
    const next = () => {
        if(nextStack.length > 0){
            let lastPoppedIndex = nextStack.pop();
            prevStack.push(lastPoppedIndex);
            if(data[lastPoppedIndex] === "x"){
                box_array[lastPoppedIndex].current.innerHTML = `<img src='${cross}'>`;
            }else if(data[lastPoppedIndex] === "o"){
                box_array[lastPoppedIndex].current.innerHTML = `<img src='${circle}'>`;
            }
            
        }
    }
    const toggle = (e,num) => {
        if (lock) {
            return 0;
        }
        if(count%2===0){
            e.target.innerHTML = `<img src='${cross}'>`;
            data[num]="x";
            prevStack.push(num);
            setCount(++count);
            textRef.current.innerHTML = 'Your move, Player O!'
        }else{
            e.target.innerHTML = `<img src='${circle}'>`;
            data[num]="o";
            prevStack.push(num);
            setCount(++count);
            textRef.current.innerHTML = 'Your move, Player X!'
        }
        
        checkWin();
    }
    const checkWin = () => {
        if(data[0]===data[1] && data[1]===data[2] && data[2]!=="")
            {
                won(data[2]);
            }
        else if(data[3]===data[4] && data[4]===data[5] && data[5]!=="")
            {
                won(data[5]);
            }
        else if(data[6]===data[7] && data[7]===data[8] && data[8]!=="")
            {
                won(data[8]);
            }
        else if(data[0]===data[3] && data[3]===data[6] && data[6]!=="")
            {
                won(data[6]);
            }
        else if(data[1]===data[4] && data[4]===data[7] && data[7]!=="")
            {
                won(data[7]);
            }
        else if(data[2]===data[5] && data[5]===data[8] && data[8]!=="")
            {
                won(data[8]);
            }   
        else if(data[0]===data[4] && data[4]===data[8] && data[8]!=="")
            {
                won(data[8]);
            }
        else if(data[2]===data[4] && data[4]===data[6] && data[6]!=="")
            {
                won(data[6]);
            }
        else{
            if(prevStack.length == 9){
                setGameWon(true);
                titleRef.current.innerHTML = 'The game ended in a draw!'
                textRef.current.innerHTML = 'Would you like to play again?'
            }
            
        }
    }
    const won = (winner) => {
        setLock(true);
        setGameWon(true);
        if(winner==='x'){
            titleRef.current.innerHTML = `Congratulations: Player <img src='${cross}'> wins!`
        }else{
            titleRef.current.innerHTML = `Congratulations: Player <img src='${circle}'> wins!`
        }
        textRef.current.innerHTML = 'Would you like to play again?'
    }
    const reset = () => {
        setCount(0)
        setLock(false);
        setGameWon(false);
        prevStack = [];
        nextStack = [];
        data = ["","","","","","","","","",]
        //hello

        titleRef.current.innerHTML = 'Let\'s Play Tic-Tac-Toe!'
        textRef.current.innerHTML = 'Your move, Player X!'
        box_array.map((e)=>{
            e.current.innerHTML = "";
        })
    }
    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Let's Play Tic-Tac-Toe!</h1>
            <div className='board'>
                <div className='row1'>
                    <div className='boxes' ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
                    <div className='boxes' ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
                    <div className='boxes' ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' ref={box4} onClick={(e)=>{toggle(e,3)}}></div>
                    <div className='boxes' ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
                    <div className='boxes' ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
                    <div className='boxes' ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
                    <div className='boxes' ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
                </div>
            </div>
            <p className='text' ref={textRef}>Your move, player X!</p>
            <div className='buttons'>
                {gameWon && (
                    <>
                    <button className='button' onClick={()=>{prev()}}>Previous</button>
                    <button className='button' onClick={()=>{reset()}}>Reset</button>
                    <button className='button' onClick={()=>{next()}}>Next</button>
                    </>
                )}
                {!gameWon && (
                    <button className='button' onClick={()=>{reset()}}>Reset</button>
                )}
            </div>
        </div>
    )
}
export default TicTacToe;