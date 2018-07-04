import React, { Component } from "react";
import { Group } from "@vx/group";

function buildStyle(a) {
  switch (a) {
    case 0:
      return {
        fill: "#fff",
        outline: "#d0d0d0",
        icon: "directions_run",
        fontColor: "#d0d0d0"
      };
    case 1:
      return {
        fill: "#da291c",
        outline: "#da291c",
        icon: "close",
        fontColor: "#fff"
      };
    case 2:
      return {
        fill: "#007a33",
        outline: "#007a33",
        icon: "check",
        fontColor: "#fff"
      };
    case 3:
      return {
        fill: "#FFCD00",
        outline: "#FFCD00",
        icon: "priority_high",
        fontColor: "#fff"
      };
    default:
      return { fill: "#000", outline: "#000" };
  }
}

export default class extends React.Component {
  render() {
    const { node, key, top, left, height, width } = this.props;
    let style = buildStyle(node.data.state);

    return (
      <Group top={top} left={left} key={key}>
        <circle r={16} stroke={"#c0c0c0"} strokeWidth={1} fill={"#fff"} />
        <circle
          r={18}
          className={node.data.state === 0 ? "circular path" : ""}
          stroke={style.outline}
          strokeWidth={3}
          fill={style.fill}
        />
        <text
          className="material-icons"
          dy={12}
          fontSize={48}
          fill={style.fontColor}
          textAnchor={"middle"}
        >
          {style.icon}
        </text>
        <text dy={30} fontSize={12} textAnchor={"middle"}>
          {node.data.name}
        </text>
      </Group>
    );
  }
}
