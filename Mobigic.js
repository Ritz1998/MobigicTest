let body = document.querySelector("body")
let container = document.createElement("div");
 let originalgrid=[]

 let getGrids=[]
// container.classList="container"

body.appendChild(container)
container.style = 'width:90%;  height:90vh;  background:#fff ; display:flex; align-items:center ; justify-content:center; flex-direction:column; flex-wrap:wrap';

let inputContainer = document.createElement("div");
container.appendChild(inputContainer);
container.style = ' width:80% ; min-width:500px; margin:auto ;background:#09e; height:200px; display:flex; flex-direction:column; align-items:center ; justify-content:center;  flex-wrap:wrap ;border-radius:10px; box-shadow:0 6px 13px #00000099  ';



let rowInput = document.createElement("input");
rowInput.setAttribute("type", "number")
rowInput.setAttribute("placeholder", "Please Enter Number Of Desired Rows")
let css = 'width:100%; padding:5px; margin: 10px; text-align:center; outline: none ; border-radius:10px ;font-size:14px ; font-weight:600'
rowInput.style = css
let columnInput = document.createElement("input");
columnInput.style = css
columnInput.setAttribute("type", "number")
columnInput.setAttribute("placeholder", "Please Enter Number Of Desired Columns")


let gridholder = document.createElement("div");
gridholder.style = ' display:grid; align-items:center; margin:20px ';
body.appendChild(gridholder);

let searchholder =document.createElement("div")

searchholder.style='display:inline-block; margin:20px 0;'

let search=document.createElement("input");
search.setAttribute("type","text");
search.setAttribute("placeholder","Enter to search word");
search.style=' border-radius:8px; text-align:center; padding:8px 3px'
searchholder.appendChild(search)

let searchbutton=document.createElement("button");
searchbutton.innerHTML="Search"
searchbutton.value=search
searchbutton.style='padding:5px; margin:0 10px; border-radius:5px'
searchholder.appendChild(searchbutton)

let button = document.createElement("button");
button.innerHTML = "Create"
button.style = 'width:100px; background:#999 ;padding:8px 3px ; font-weight:bold; border-radius:10px ; float:right; margin:20px 0'

searchbutton.addEventListener('click',()=>{
    // console.log(e.target.value);
    searchword(search.value)
})

button.addEventListener("click", () => {

    if (gridholder.firstChild !== null) {
        gridholder.firstChild.remove()
    }
    let grids = document.createElement("div")
    grids.style = 'margin:auto; padding:5px ; border:3px solid black;'
    gridholder.appendChild(grids)

    let alphas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let c = rowInput.value;
    let r = columnInput.value

   
    // console.log(grids);
    for (var i = 0; i < c; i++) {
        originalgrid[i]=[ ];
        getGrids[i]=[ ];
        for (var j = 0; j < r; j++) {
            let g = document.createElement("div")
           let char= alphas.charAt(Math.floor(Math.random() *
            alphas.length));
            g.style = 'border: 1px solid black;  display:inline-block ; width:50px;height:50px; text-align:center;line-height:50px;'
            g.innerHTML =char
            grids.appendChild(g)
            
            originalgrid[i][j]=char
            getGrids[i][j]=g

                ;
        }
        grids.appendChild(document.createElement("br"))
    }
    //  searchword()
    //  console.log(grids.childNodes);
})



inputContainer.appendChild(rowInput)
inputContainer.appendChild(columnInput)
inputContainer.appendChild(button)
inputContainer.appendChild(searchholder)


function searchword(findword) {
   
    let R, C;

    let x = [-1, -1, -1, 0, 0, 1, 1, 1];

    let y = [-1, 0, 1, -1, 1, -1, 0, 1];

    function search2D(grid, row, col, word) {
      
        if (grid[row][col] != word[0])
            return false;

        let len = word.length;

        // Search word in all 8 directions
        // starting from (row, col)
        for (let dir = 0; dir < 8; dir++) {
            // Initialize starting point
            // for current direction
            let k, rd = row + x[dir], cd = col + y[dir];
            
            // getGrids[row][col].style.color='green'
            // First character is already checked,
            // match remaining characters
            for (k = 1; k < len; k++) {
                // If out of bound break
                if (rd >= R || rd < 0 || cd >= C || cd < 0)
                    break;

                // If not matched, break
                if (grid[rd][cd] != word[k])
                    break;

                // Moving in particular direction
                // getGrids[rd][cd].style.color='green'
                rd += x[dir];
                cd += y[dir];
            }
           

            // If all character matched,
            // then value of must
            // be equal to length of word
            if (k == len){
            // getGrids[row][col].style.color='red'
                return true;
            }
        }
        return false;
    }

    // Searches given word in a given
    // matrix in all 8 directions
    function patternSearch(grid, word) {
        // Consider every point as starting
        // point and search given word
        for (let row = 0; row < R; row++) {
            for (let col = 0; col < C; col++) {
                for(let i=0;i<getGrids.length;i++){
                    getGrids[row][col].style.color='black'
                    getGrids[row][col].style.background='#fff'
                }
                if (search2D(grid, row, col, word)){
                   console.log(
                        "pattern found at " + row + ", " + col + "<br>");
                        for(let i=0;i<getGrids.length;i++){
                            getGrids[row][col].style.color='white'
                            getGrids[row][col].style.background='#0c0'
                        }
                    }
            }
        }
    }
  // Driver code
    R = rowInput.value;
    C = columnInput.value;
    let grid =originalgrid;
    // console.log(R,C,grid);
    patternSearch(grid, findword);
  
    // patternSearch(grid, "EC");

}





