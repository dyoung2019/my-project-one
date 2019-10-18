# TIC TAC TOE

## General Assembly Project #1

![Screenshot of Tic-Tac-Toe on load](https://github.com/dyoung2019/my-project-one/tree/master/images/Screenshot_0.png "Tic-Tac-Toe on load")
![Screenshot of Tic-Tac-Toe on win screen](https://github.com/dyoung2019/my-project-one/tree/master/images/Screenshot_1.png "Tic-Tac-Toe on win scren")

[link](https://dyoung2019.github.io/my-project-one/)

## Description

Isometric version of tic-tac-toe built for mobile devices (i.e. iPhone 8 portrait mode; 375px * 667px) written in HTML, js and CSS.

### Assessment

Design and code a Tic-Tac-Toe game in four days (Tues. 15th - Fri 18th Oct 2019) in HTML, CSS and js. And have it published on github pages.

### Concept 

Initially, my concept was going to have 2D sprite assets like coffee cups and donuts yet drawing them from a top-down perspective wasn't very interesting. Then I doodle some donuts from a low angle and from a isometric perspective looked better.

Then I looked into developing a tic-tac-toe board with isometric tiles where I could have icons/sprites sit on top. 

Though googling __isometric css__ I found a bunch of links on using isometric tiles with 3D.
  - [tutsplus.com - How to Create an Isometric Layout With CSS 3D Transforms](https://webdesign.tutsplus.com/tutorials/create-an-isometric-layout-with-3d-transforms--cms-27134)
  - [Andy Barefoot - Isometric layout with CSS Grid](https://codepen.io/andybarefoot/post/isometric-layout-with-css-grid)
  - [Andy Barefoot - Codepen example](https://codepen.io/andybarefoot/pen/69bd447c7b49ba8a43a7de990f976ba1)
  - [Rory Ashford-Bentley - Isometric CSS Grid](https://roryashfordbentley.me/projects/isometric-css-grid\)

From own [codepen test](https://codepen.io/dyoung2019/pen/WNNwyrg?editors=1111), I found that the math involved with the CSS ``transform`` involving skews and rotations made the placement of tiles difficult. Yet the rendering of text looked okay.

Therefore, I decided to reduce the scope to just draw the tiles with a 'X' or 'O' character in text because figure out the position of the tile seems too difficult to place a 2D sprite on top.

Later on I found this [Gravit Designer article](https://medium.com/gravitdesigner/designers-guide-to-isometric-projection-6bfd66934fc7) that described SR45&deg; to draw isometric tiles which was

  - rotate by 45&deg; degrees (controls the orientation of text on the tile)
  - scale in y axis by 0.577350269189626 (i.e. tan(30&deg;))

I incorporate more transforms for scaling and translation to nudge tile into the correct position.

````CSS
  transform: translate(var(--board-x-offset), var(--board-y-offset))
    scale3d(var(--board-scale), calc(var(--board-scale) * 0.577350269189626), 1.0) rotateZ(-45deg);
```` 
### Design process

#### Day 1 (Tues. )

- Started writing out the psuedo-code for the logic for playing tic-tac-toe such as figure out a win/loss and place a X or O on the board. (_See design/brainstorm.MD_)
- Play some existing browser games of Tic-tac-toe
- Drew some rough sketches of some wireframes using landscape widescreen desktop (16 : 9).
- Investigate approaches to render isometric tiles for 

#### Day 2 (Wed.)

- I asked what screen and resolution should be be design for. Our instructor suggests I should design for the mobile screen first and I decided to design it for the iPhone 8 (375 * 667).
- Started coding the javascript based off the psuedo-code I wrote earlier.
- Tried to turn my pencil wireframes in [Gravit Designer]() and then [Sketch](https://www.sketch.com/) but I could not figure out how to add a grid/margin guidelines.
- Later I sign up for [Figma] and found it a lot better for me in design a number of wireframes really quickly. From my later wireframes, I realised I could remove some of UI elements if they appear as a splash screen / pop up. (_See wireframes/Tic Tac Toe.pdf_)

#### Day 3 (Thur.)
- A lot of HTML, js, CSS coding.
- Need a spreadsheet to handle a lot of calculation with layout HTML elements based on a 15 x 6 grid wireframe.
- Picked a palette from [Adobe Colors] but I feel the website can't generate new palettes that are one or two shades lighter/ darker well and I had manually tweaked the palette myself.
  - [Compound Pastel Lite](https://color.adobe.com/Compound-Pastel-Lite-color-theme-13525047)
  - [Compound Pastel Dark](https://color.adobe.com/Compound-Pastel-Dark-color-theme-13526974)

#### Day 4. (Fri. )

- Finally integrated a typeface into the game; Chose Montserrat but 


### Lessons Learned

 - __FIRST THING__ You should ask what device and aspect ratio you are design 
 - I wish I had figure out earlier on a way to scale with different screen resolutions first with respect to my wireframe grid layout.
 - For my next projects, I think I would use [Figma] for developing new wireframes. I have been looking for a tool that handle grid, guidelines and margins well outside Photoshop. 
 - There is probably a better way extract or generating 
 - For rendering square isometric tiles, the tile (prior to CSS transform) must have the same width and height. Otherwise the tile will appear out skewed and misaligned. This is why I hard-code the game work according on 375px * 667px (9:16 aspect ratio).
 - [Adobe Colors] is good as a starting point yet it is not a complete solution for generating variants of a initial shade. Also I don't like copy CSS colour values. Possible alternatives could be [coolors.co](https://coolors.co/).

### TODOs

Possible features to incorporate later
  - Web page doesn't scale with screen size
  - Computer player
  - SFX with Web Audio 
  - Save game scores
  

[Adobe Colors]:https://color.adobe.com/create
[Figma]: https://www.figma.com