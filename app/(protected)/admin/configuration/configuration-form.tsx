"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { Configuration } from "@/types";
import { configurationSchema } from "@/lib/validators";

const ConfigurationForm = () => {

    const form = useForm<Configuration>({
        resolver: zodResolver(configurationSchema),
        defaultValues: {},
    })

    function onSubmit(values: Configuration) {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Configuration</h1>
                    <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
                        Button
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="w-full">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <Accordion  type="multiple" className="w-full" defaultValue={["general", "email"]}>
                            <AccordionItem value="general">
                                <AccordionTrigger>General</AccordionTrigger>
                                <AccordionContent className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter project name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="logo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Logo</FormLabel>
                                                <FormControl>
                                                    <Input type="file" onClick={field.onChange}  />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                     <FormField
                                        control={form.control}
                                        name="favicon"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Favicon</FormLabel>
                                                <FormControl>
                                                    <Input type="file" onClick={field.onChange}  />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="email">
                                <AccordionTrigger>Email</AccordionTrigger>
                                <AccordionContent className="space-y-8 mt-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter email" {...field}  />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Button type="submit">Submit</Button>

                    </form>
                </Form>
            </CardContent >
        </Card >
    );
};

export default ConfigurationForm;