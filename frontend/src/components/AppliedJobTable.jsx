import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // if (!allAppliedJobs) {
  //   return <div>No jobs Applied</div>; // You can replace this with a loading spinner or another UI element.
  // }
  return (
    <>
      <div>
        <Table>
          <TableCaption>List of applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!allAppliedJobs ? (
              <span>You haven't applied any job yet.</span>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge>{appliedJob.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AppliedJobTable;
