import React from "react";
import { ResponsivePie } from "@nivo/pie";

const Chart = ({ data }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 50, right: 100, bottom: 100, left: 100 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={4}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#FFFFFF"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={24}
        radialLabelsLinkHorizontalLength={20}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={4}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
            },
        ]}
        tooltip={({ id, value }) => (
            <strong>
                {id}: {value}
            </strong>
        )}
        theme={{
            tooltip: {
                container: {
                    background: "#333",
                    color: "#1DB954",
                },
            },
            labels: {
                text: {
                    fontSize: 20,
                },
            },
        }}
    />
);

export default Chart;
