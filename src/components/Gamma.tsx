import React, { useEffect, useState } from "react";
import { Table, Card, Text, Space } from "@mantine/core";
import { wineDataSet, WineData } from "../constants/winedata";
import calculateMean from "../utilities/calculateMean";
import calculateMedian from "../utilities/calculateMedian";
import calculateMode from "../utilities/calculateMode";

interface GammaData {
  alcoholClass: string;
  mean: string;
  median: string;
  mode: string;
}

const GammaStatistics: React.FC = () => {
  const [gammaData, setGammaData] = useState<GammaData[]>([]);

  useEffect(() => {
    const calculateStatistics = (data: WineData[]) => {
      const gammaValues: { [key: string]: number[] } = {};

      // Calculate Gamma for each point and group by class of alcohol
      data.forEach((item: WineData) => {
        const alcoholClass = item.Alcohol;
        const gamma = ((((item.Ash as number) * item.Hue) as number) /
          item.Magnesium) as number;
        if (!gammaValues[alcoholClass]) {
          gammaValues[alcoholClass] = [];
        }
        gammaValues[alcoholClass].push(gamma);
      });

      // Calculate mean, median, and mode for each class of alcohol
      const meanData = Object.entries(gammaValues).map(
        ([alcoholClass, values]) => ({
          alcoholClass,
          mean: calculateMean(values).toFixed(3),
        })
      );
      const medianData = Object.entries(gammaValues).map(
        ([alcoholClass, values]) => ({
          alcoholClass,
          median: calculateMedian(values).toFixed(3),
        })
      );
      const modeData = Object.entries(gammaValues).map(
        ([alcoholClass, values]) => ({
          alcoholClass,
          mode: calculateMode(values).toFixed(3),
        })
      );

      // Combine mean, median, and mode data for each class of alcohol
      const combinedData: GammaData[] = meanData.map((meanItem) => ({
        ...meanItem,
        median: medianData.find(
          (medianItem) => medianItem.alcoholClass === meanItem.alcoholClass
        )!.median,
        mode: modeData.find(
          (modeItem) => modeItem.alcoholClass === meanItem.alcoholClass
        )!.mode,
      }));

      setGammaData(combinedData);
    };

    calculateStatistics(wineDataSet);
  }, []);

  return (
    <Card className="gamma-table">
      <Text size="xl" fw={700} ta="center">
        Wine{" "}
        <Text span c="blue" inherit>
          Gamma
        </Text>{" "}
        Statistics
      </Text>
      <Space h="xl" />
        <Table
          striped
          highlightOnHover
          withTableBorder
          horizontalSpacing="xl"
          verticalSpacing="lg"
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ textAlign: "center" }}>Gamma Measure</Table.Th>
              {gammaData.map((value, index) => (
                <Table.Th style={{ textAlign: "center" }} key={index}>Class {value.alcoholClass}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td style={{ textAlign: "center" }}>Gamma Mean</Table.Td>
              {gammaData.map((item, index) => (
                <Table.Td key={index}>{item.mean}</Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Td style={{ textAlign: "center" }}>Gamma Median</Table.Td>
              {gammaData.map((item, index) => (
                <Table.Td key={index}>{item.median}</Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Td style={{ textAlign: "center" }}>Gamma Mode</Table.Td>
              {gammaData.map((item, index) => (
                <Table.Td key={index}>{item.mode}</Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
    </Card>
  );
};

export default GammaStatistics;
