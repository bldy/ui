import React from "react";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { LinearGradient } from "@vx/gradient";
import { hierarchy } from "d3-hierarchy";
import { pointRadial } from "d3-shape";
import { ParentSize } from "@vx/responsive";

import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine
} from "@vx/shape";

import Node from "./Node";
import Card from "@material/react-card/dist";

const data = {
  name: "cf-kernel",
  state: 0,

  children: [
    {
      name: "cf-initram",
      state: 1
      /*  children: [
        { name: "A1" },
        { name: "A2" },
        { name: "A3" },
        {
          name: "C",
          children: [
            {
              name: "C1"
            },
            {
              name: "D",
              children: [
                {
                  name: "D1"
                },
                {
                  name: "D2"
                },
                {
                  name: "D3"
                }
              ]
            }
          ]
        }
      ]*/
    },
    {
      name: "cf-libc",
      state: 3
    },
    {
      name: "cf-systemd",
      state: 2
      //    children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }]
    }
  ]
};

export default class extends React.Component {
  state = {
    layout: "cartesian",
    orientation: "horizontal",
    linkType: "diagonal",
    stepPercent: 0.5
  };

  render() {
    const {
      // data,
      width,
      height,
      events = false,
      margin = {
        top: 0,
        left: 30,
        right: 30,
        bottom: 0
      }
    } = this.props;
    const { layout, orientation, linkType, stepPercent } = this.state;

    if (width < 10) return null;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;

    if (layout === "polar") {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === "vertical") {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }

    return (
      <div>
        <ParentSize className="graph-container">
          {({ width: w, height: h }) => {
            return (
              <svg width={width} height={height}>
                <Tree
                  top={margin.top}
                  left={margin.left}
                  root={hierarchy(data)}
                  size={[sizeWidth, sizeHeight]}
                  separation={(a, b) =>
                    (a.parent == b.parent ? 1 : 0.5) / a.depth
                  }
                >
                  {({ data }) => (
                    <Group top={origin.y} left={origin.x}>
                      {data.links().map((link, i) => {
                        let LinkComponent;

                        if (layout === "polar") {
                          if (linkType === "step") {
                            LinkComponent = LinkRadialStep;
                          } else if (linkType === "curve") {
                            LinkComponent = LinkRadialCurve;
                          } else if (linkType === "line") {
                            LinkComponent = LinkRadialLine;
                          } else {
                            LinkComponent = LinkRadial;
                          }
                        } else {
                          if (orientation === "vertical") {
                            if (linkType === "step") {
                              LinkComponent = LinkVerticalStep;
                            } else if (linkType === "curve") {
                              LinkComponent = LinkVerticalCurve;
                            } else if (linkType === "line") {
                              LinkComponent = LinkVerticalLine;
                            } else {
                              LinkComponent = LinkVertical;
                            }
                          } else {
                            if (linkType === "step") {
                              LinkComponent = LinkHorizontalStep;
                            } else if (linkType === "curve") {
                              LinkComponent = LinkHorizontalCurve;
                            } else if (linkType === "line") {
                              LinkComponent = LinkHorizontalLine;
                            } else {
                              LinkComponent = LinkHorizontal;
                            }
                          }
                        }

                        return (
                          <LinkComponent
                            data={link}
                            className="line"
                            percent={stepPercent}
                            stroke="silver"
                            strokeWidth="2"
                            fill="none"
                            key={i}
                          />
                        );
                      })}

                      {data.descendants().map((node, key) => {
                        const width = 40;
                        const height = 20;

                        let top;
                        let left;
                        if (layout === "polar") {
                          const [radialX, radialY] = pointRadial(
                            node.x,
                            node.y
                          );
                          top = radialY;
                          left = radialX;
                        } else {
                          if (orientation === "vertical") {
                            top = node.y;
                            left = node.x;
                          } else {
                            top = node.x;
                            left = node.y;
                          }
                        }

                        return (
                          <Node
                            key={key}
                            node={node}
                            top={top}
                            left={left}
                            key={key}
                            height={height}
                            width={width}
                          />
                        );
                      })}
                    </Group>
                  )}
                </Tree>
              </svg>
            );
          }}
        </ParentSize>
      </div>
    );
  }
  hg;
}