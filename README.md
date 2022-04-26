# Maze Renderer
Maze renderer is a minimalistic implementation of the Wolfenstein 3D engine created using the p5.js library. The maze renderer can be split into two components, 
the maze generation and rendering the boundaries seen within the view cone.

### Deployment
https://they2kbug.github.io/Maze-Renderer/

## At a glance
https://user-images.githubusercontent.com/76219678/164592467-cfba4961-3b5c-4a40-8eff-892d7b131af7.mp4

## Maze Generation
A grid is first defined depending on the viewport width and height. The first 16 columns and 9 rows are left for displaying the rendered scene while the 
remaining grids are used for generating the maze. The maze is generated using recursive backtracking. A new instance of the maze is generated everytime 
the page is loaded or refreshed.

<div align="center"> 
  <img src="https://user-images.githubusercontent.com/76219678/164594853-4e5519e5-b77e-4b70-bc3b-726c70f9a3fc.gif" alt="maze generation">
</div>

## Rendering the boundaries within viewcone
A 3D perspective is generated using the 2D map visible within the view cone. Rays are cast at increments of 0.2 degrees from the player with a 60 degrees FOV.
Each ray is mapped to specific height, and the varying height difference generates the 3D perspective. 


https://user-images.githubusercontent.com/76219678/164601499-64ef6dec-72b7-478d-b9e6-abeb23d5677c.mp4


<b> Note: </b> In this context "ray" refers to the distance (z-component) of each ray from the player (blue circle) to the closest boundary within FOV


For a detailed implementation of ray casting, refer to https://lodev.org/cgtutor/raycasting.html

### Scope of future work
<ul>
  <li> Add support for mobile devices
  <li> Optimize code to improve rendering frame rate without compromising on view cone ray-angle resolution (current frame rate - 30FPS)
  <li> Explore other maze generation algorithms
  <li> Add objectives and turn it into a short game
</ul>

##

This project was inspired by the tutorial series on <a href="https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html">2D Raycasting</a> and 
<a href="https://thecodingtrain.com/CodingChallenges/010.1-maze-dfs-p5.html">Maze Generation</a> by Daniel Shiffman
