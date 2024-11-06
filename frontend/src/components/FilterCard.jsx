import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <>
      <div className="w-full bg-white p-3 rounded-md shadow-lg">
        <h1 className="text-lg md:text-xl font-medium">Filter Jobs</h1>
        <hr className="mt-3" />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div className="mt-3" key={index}>
              <h1 className="text-md md:text-lg font-bold">
                {data.filterType}
              </h1>
              {data.array.map((item, idx) => {
                const itemId = `id${index} - ${idx}`;
                return (
                  <div className="flex items-center space-x-2 m-2" key={index}>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="font-normal">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default FilterCard;
