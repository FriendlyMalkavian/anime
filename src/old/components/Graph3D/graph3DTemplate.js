Template.prototype.graph3DTemplate = () => `
    <div class="graph3D">
        <div class="light">
            <div class="lightSpinning">
                <label>
                    <input type="checkbox" id="lightSpinning" class="Options3D">
                    <span class="checkingButtonStyle">Light Spinning</span>
                </label>
            </div>
            <div class="powerOfLight">
                <input id="powerOfLight" type="range" min="5000" max="45000", step="1000" value="45000">
            </div>
            <div class="colorSelector">
                <input id="colorSelector" type="color" value="#009dff">
            </div>
            <div>
                <label>
                    <input type="checkbox" id="animation" class="Options3D">
                    <span class="checkingButtonStyle">Animation</span>
                </label>
            </div>
        </div>
        <div class ="canvas3D">
            <canvas id="canvas3D"></canvas>
            <div class="allows">
                <label>
                    <input type="checkbox" id="isPoints" class="Options3D" checked>
                    <span class="checkingButtonStyle">Points</span>
                </label>
                <label>
                    <input type="checkbox" id="isEdges" class="Options3D" checked>
                    <span class="checkingButtonStyle">Edges</span>
                </label>
                <label>
                    <input type="checkbox" id="isPolygons" class="Options3D" checked>
                    <span class="checkingButtonStyle">Polygons</span>
                </label>
            </div>
        </div>
        <div class="figures">
            <div class="addDelFigureBlock">
                <button id="addFigure" class="countOfFigures">Add Figure</button>
                <button id="deleteFigure" class="countOfFigures">Delete Figure</button>
            </div>
            <div class="figureSelector">
                <button id="arrow-left"></button>
                <select id="figures">
                    <option class ="option">cube</option>
                    <option class ="option">cone</option>
                    <option class ="option">pyramid</option>
                    <option class ="option" selected="selected">sphere</option>
                    <option class ="option">ellipsoid</option>
                    <option class ="option">ellipticalCylinder</option>
                    <option class ="option">ellipticalParaboloid</option>
                    <option class ="option">hyperbolicCylinder</option>
                    <option class ="option">hyperbolicParaboloid</option>
                    <option class ="option">parabolicCylinder</option>
                    <option class ="option">singleHyperboloid</option>
                    <option class ="option">doubleHyperboloid</option>
                    <option class ="option">tor</option>
                </select>
                <button id="arrow-right"></button>
            </div>
        </div>
    </div>
`;