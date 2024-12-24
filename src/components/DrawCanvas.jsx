import React, { useState} from 'react';
import { Stage, Layer, Rect, Line, Circle } from 'react-konva';
import { useNavigate } from 'react-router-dom';
const DrawCanvas = ({ onSubmitShapes }) => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [sliderValues, setSliderValues] = useState({}); // Object to store slider values for each edge
  const [rotationFixed, setRotationFixed] = useState(false); // State to check if rotation is fixed
  const [shapeSubmitted, setShapeSubmitted] = useState(false); // State to check if shape is submitted
  const [currentEdgeIndex, setCurrentEdgeIndex] = useState(0); // Index to track the current edge
  const navigate = useNavigate();
  
  // Function to add a new shape to the center of the canvas

  const handleShapeClick = (shapeType) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newShape = {
      id: 1,
      x: centerX - 150, // Adjusted for better positioning
      y: centerY - 75,
      type: shapeType,
    };

    // Set the newly selected shape
    setSelectedShape(newShape);
    setRotation(0);
    setRotationFixed(false); // Reset rotation fixed state
    setShapeSubmitted(false); // Reset submission state
    setSliderValues({}); // Reset slider values
    setCurrentEdgeIndex(0); // Reset edge index
  };

  // Predefined shapes for selection
  const predefinedShapes = [
    { type: 'rect', id: 'rectangle', label: 'Rectangle' },
    { type: 'line', id: 'line', label: 'Line' },
  ];

  // Render the selected shape
  const renderShape = () => {
    if (!selectedShape) return null;

    const { type, x, y } = selectedShape;

    switch (type) {
      case 'rect':
        return (
          <Rect
            x={x} y={y}
            width={300} height={150}
            fill="black"
            rotation={rotation}
          />
        );
      case 'line':
        return (
          <Line
            x={x} y={y}
            points={[0, 0, 400, 0]}
            stroke="black"
            strokeWidth={7}
            rotation={rotation}
          />
        );
      default:
        return null;
    }
  };

  // Calculate the endpoints for the edges based on the selected shape and its rotation
  const calculateEdgeEndpoints = () => {
    if (!selectedShape) return [];

    const { type, x, y } = selectedShape;
    const angle = (Math.PI / 180) * rotation; // Convert to radians
    let edges = [];

    switch (type) {
      case 'rect':
        edges = [
          [{ id: 'top-left', x: x, y: y }, { id: 'top-right', x: x + 300, y: y }],
          [{ id: 'top-right', x: x + 300, y: y }, { id: 'bottom-right', x: x + 300, y: y + 150 }],
          [{ id: 'bottom-right', x: x + 300, y: y + 150 }, { id: 'bottom-left', x: x, y: y + 150 }],
          [{ id: 'bottom-left', x: x, y: y + 150 }, { id: 'top-left', x: x, y: y }],
        ];
        break;
      case 'line':
        edges = [
          [{ id: 'start', x: x, y: y }, { id: 'end', x: x + 400, y: y }],
        ];
        break;
      default:
        break;
    }

    return edges.map(([start, end]) => [
      {
        ...start,
        x: (start.x - x) * Math.cos(angle) - (start.y - y) * Math.sin(angle) + x,
        y: (start.x - x) * Math.sin(angle) + (start.y - y) * Math.cos(angle) + y,
      },
      {
        ...end,
        x: (end.x - x) * Math.cos(angle) - (end.y - y) * Math.sin(angle) + x,
        y: (end.x - x) * Math.sin(angle) + (end.y - y) * Math.cos(angle) + y,
      },
    ]);
  };

  // Handle slider change for a specific edge
  const handleSliderChange = (index, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  // Render the sliders and the points along the edges
  const renderSlidersAndPoints = () => {
    if (!rotationFixed) return null; // Only render sliders if rotation is fixed

    const edges = calculateEdgeEndpoints();
    const currentEdge = edges[currentEdgeIndex];

    if (!currentEdge) return null;

    const [start, end] = currentEdge;

   
    const dotX = start.x + (sliderValues[currentEdgeIndex] || 0.5) * (end.x - start.x);
    const dotY = start.y + (sliderValues[currentEdgeIndex] || 0.5) * (end.y - start.y);

    return (
      <React.Fragment>
        {}
        <Line
          points={[start.x, start.y, end.x, end.y]}
          stroke="gray"
          strokeWidth={2}
        />
        {}
        <Circle
          x={dotX}
          y={dotY}
          radius={8}
          fill="red"
        />
      </React.Fragment>
    );
  };

  
  const renderInfoBox = () => {
    const edges = calculateEdgeEndpoints();
    const percentages = edges.map((_, index) => Math.round((sliderValues[index] || 0.5) * 100)); 

    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '0%',
        backgroundColor:  '#43ccba',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      
      }}>
        <h2 style={{ color: 'blue' }}>Shape Info</h2>
        <p style={{ color: 'black' }}><strong>Rotation:</strong> {rotation}°</p>
        {edges.map((edge, index) => (
          <p key={index} style={{ color: 'black' }}>
            <strong>{edge[0].id} to {edge[1].id}:</strong> {percentages[index]}%
          </p>
        ))}
      </div>
    );
  };
  const handleShapeSubmit = () => {
    if (selectedShape) {
      const shapeData = {
        type: selectedShape.type,
        rotation: rotation,
        points: sliderValues 
      };
      onSubmitShapes(shapeData);
      setShapeSubmitted(true);
      navigate(-1);
    }
  };

 
  const handlePrevEdge = () => {
    setCurrentEdgeIndex((prevIndex) => (prevIndex - 1 + calculateEdgeEndpoints().length) % calculateEdgeEndpoints().length);
  };


  const handleNextEdge = () => {
    setCurrentEdgeIndex((prevIndex) => (prevIndex + 1) % calculateEdgeEndpoints().length);
  };

  return (
    <div style={{ display: 'flex' }}>
  {}
  <div
    style={{
      width: '200px',
      padding: '10px',
      borderRight: '2px solid black',
      position: 'fixed', 
      top: 0,
      left: 0,
      height: '100vh', 
      backgroundColor: 'black',
      overflowY: 'auto', 
      zIndex: 1000,
    }}
  >
    <h3 style={{ padding: '10px 0', textAlign: 'center'}} >Select Shape</h3>
    {predefinedShapes.map((shape) => (
      <div
        key={shape.id}
        style={{
          width: '100px',
          height: '50px',
          border: '1px solid black',
          marginBottom: '10px',
          textAlign: 'center',
          lineHeight: '50px',
          cursor: 'pointer',
          color: 'black',
          backgroundColor: '#eaeaea',
        }}
        onClick={() => handleShapeClick(shape.type)}
      >
        {shape.label}
      </div>
    ))}

    <button onClick={handleShapeSubmit} style={{ marginTop: '20px' }}>
      Submit Shape
    </button>

    <label>
      Rotation:
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={(e) => setRotation(Number(e.target.value))}
        style={{ marginLeft: '10px' }}
        disabled={rotationFixed} 
      />
    </label>
    <button
      onClick={() => setRotationFixed(true)}
      style={{ marginTop: '10px' }}
      disabled={shapeSubmitted}
    >
      Fix Rotation
    </button>
    <button
      onClick={() => {
        setRotation(0);
        setRotationFixed(false);
      }}
      style={{ marginTop: '10px' }}
    >
      Reset Rotation
    </button>

    {}
    {rotationFixed && (
      <div style={{ marginTop: '20px' }}>
        <label>Move Current Edge:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={sliderValues[currentEdgeIndex] || 0.5}
          onChange={(e) =>
            handleSliderChange(currentEdgeIndex, parseFloat(e.target.value))
          }
          style={{ width: '100%' }}
        />
        <div>
          <button onClick={handlePrevEdge} style={{ marginTop: '10px' }}>
            Previous Edge
          </button>
          <button onClick={handleNextEdge} style={{ marginTop: '10px' }}>
            Next Edge
          </button>
        </div>
      </div>
    )}
  </div>

  {}
  <div
    style={{
      width: 'calc(100% - 200px)', 
      height: '100vh',
      marginLeft: '200px', 
      backgroundColor: 'white',
      border: '1px solid black',
      position: 'relative',
    }}
  >
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {renderShape()}
        {renderSlidersAndPoints()}
      </Layer>
    </Stage>
    {}
    {renderInfoBox()}
  </div>
</div>

  );
};

export default DrawCanvas;
