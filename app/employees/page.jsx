"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Label } from "../../components/ui/label";

const employeeSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters." }),
  salary: z.number().positive({ message: "Salary must be a positive number." }),
  hireDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format.",
  }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
  emergencyContact: z
    .string()
    .min(2, { message: "Emergency contact must be at least 2 characters." }),
  emergencyPhone: z
    .string()
    .min(10, { message: "Emergency phone must be at least 10 digits." }),
  notes: z.string().optional(),
  status: z.enum(["Active", "On Leave", "Terminated"]),
  performanceRating: z.number().min(1).max(5),
  projectAssignment: z.string().optional(),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  position: "",
  salary: 0,
  hireDate: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  emergencyContact: "",
  emergencyPhone: "",
  notes: "",
  status: "Active",
  performanceRating: 3,
  projectAssignment: "",
};

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  useEffect(() => {
    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const onSubmit = (data) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...data, id: emp.id } : emp
        )
      );
      setEditingEmployee(null);
      toast({
        title: "Employee Updated",
        description: "The employee information has been successfully updated.",
      });
    } else {
      setEmployees([...employees, { ...data, id: Date.now().toString() }]);
      toast({
        title: "Employee Added",
        description:
          "A new employee has been successfully added to the system.",
      });
    }
    reset(defaultValues);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    reset(employee);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    toast({
      title: "Employee Deleted",
      description: "The employee has been removed from the system.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingEmployee ? "Edit Employee" : "Add New Employee"}
          </CardTitle>
          <CardDescription>
            {editingEmployee
              ? "Update the employee's information below."
              : "Enter the details of the new employee."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="1234567890"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  onValueChange={(value) =>
                    register("department").onChange({ target: { value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500">
                    {errors.department.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  {...register("position")}
                  placeholder="Software Engineer"
                />
                {errors.position && (
                  <p className="text-sm text-red-500">
                    {errors.position.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  {...register("salary", { valueAsNumber: true })}
                  placeholder="50000"
                />
                {errors.salary && (
                  <p className="text-sm text-red-500">
                    {errors.salary.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input id="hireDate" type="date" {...register("hireDate")} />
                {errors.hireDate && (
                  <p className="text-sm text-red-500">
                    {errors.hireDate.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} placeholder="New York" />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register("state")} placeholder="NY" />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  {...register("zipCode")}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-500">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  {...register("country")}
                  placeholder="USA"
                />
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  {...register("emergencyContact")}
                  placeholder="Jane Doe"
                />
                {errors.emergencyContact && (
                  <p className="text-sm text-red-500">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                <Input
                  id="emergencyPhone"
                  {...register("emergencyPhone")}
                  placeholder="9876543210"
                />
                {errors.emergencyPhone && (
                  <p className="text-sm text-red-500">
                    {errors.emergencyPhone.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) =>
                    register("status").onChange({ target: { value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="performanceRating">
                  Performance Rating (1-5)
                </Label>
                <Input
                  id="performanceRating"
                  type="number"
                  min="1"
                  max="5"
                  {...register("performanceRating", { valueAsNumber: true })}
                />
                {errors.performanceRating && (
                  <p className="text-sm text-red-500">
                    {errors.performanceRating.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="projectAssignment">Project Assignment</Label>
                <Input
                  id="projectAssignment"
                  {...register("projectAssignment")}
                  placeholder="Project X"
                />
                {errors.projectAssignment && (
                  <p className="text-sm text-red-500">
                    {errors.projectAssignment.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Additional notes about the employee"
              />
              {errors.notes && (
                <p className="text-sm text-red-500">{errors.notes.message}</p>
              )}
            </div>
            <Button type="submit">
              {editingEmployee ? "Update Employee" : "Add Employee"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>
            Manage and view all employees in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
