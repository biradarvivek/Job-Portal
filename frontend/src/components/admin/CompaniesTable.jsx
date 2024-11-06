import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterComapany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of Your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Companies not found!
              </TableCell>
            </TableRow>
          ) : (
            filterComapany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

// import React from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Edit2, MoreHorizontal } from "lucide-react";

// const CompaniesTable = () => {
//   const rowData = [
//     {
//       logo: "https://e7.pngegg.com/pngimages/421/506/png-clipart-google-logo-google-home-alphabet-inc-google-company-trademark.png",
//       name: "Company Name 1",
//       date: "18-07-2024",
//     },
//     {
//       logo: "https://e7.pngegg.com/pngimages/421/506/png-clipart-google-logo-google-home-alphabet-inc-google-company-trademark.png",
//       name: "Company Name 2",
//       date: "19-07-2024",
//     },
//     {
//       logo: "https://e7.pngegg.com/pngimages/421/506/png-clipart-google-logo-google-home-alphabet-inc-google-company-trademark.png",
//       name: "Company Name 3",
//       date: "20-07-2024",
//     },
//   ];

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white shadow-xl rounded-lg overflow-hidden">
//         <thead>
//           <tr className="bg-gray-800 text-white">
//             <th className="py-4 px-6 text-left">Logo</th>
//             <th className="py-4 px-6 text-left">Name</th>
//             <th className="py-4 px-6 text-left">Date</th>
//             <th className="py-4 px-6 text-right">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rowData.map((row, index) => (
//             <tr
//               key={index}
//               className={`hover:bg-gray-200 transition-all duration-300
//                           animate-slide-in-from-left delay-${index * 150}ms`}
//             >
//               <td className="py-4 px-6">
//                 <Avatar className="rounded-full w-12 h-12 border-2 border-white shadow-lg">
//                   <AvatarImage src={row.logo} alt={`${row.name} logo`} />
//                 </Avatar>
//               </td>
//               <td className="py-4 px-6 text-gray-800 font-medium">
//                 {row.name}
//               </td>
//               <td className="py-4 px-6 text-gray-600">{row.date}</td>
//               <td className="py-4 px-6 text-right">
//                 <Popover>
//                   <PopoverTrigger>
//                     <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black transition-colors" />
//                   </PopoverTrigger>
//                   <PopoverContent className="w-32 bg-white rounded-lg shadow-lg">
//                     <div className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-colors">
//                       <Edit2 className="w-4 text-gray-800" />
//                       <span className="text-gray-800">Edit</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CompaniesTable;
