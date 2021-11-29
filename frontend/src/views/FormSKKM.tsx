import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Input,
  InputGroup,
  Button,
  Heading,
  InputLeftAddon,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Divider,
  Spacer,
  Spinner,
  Alert,
  AlertIcon,
  useMediaQuery
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { DataForm } from "../types/interfaces";

const FormSKKM: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: DataForm) => {
    setLoading(true);

    window.confirm(JSON.stringify(data));

    setLoading(false);
  }

  return (
    <Flex p={6} flexDirection="column">
      <Heading my={4}>Form SKKM</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.nama}>
          <Heading as='h4' size="md">Nama Mahasiswa</Heading>
          <InputGroup>
            <Input
              {...register("nama", {
                required: "Isi nama kamu"
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.nama && errors.nama.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.nim} my={6}>
          <Heading as='h4' size="md">NIM</Heading>
          <InputGroup>
            <Input
              {...register("nim", {
                required: "Isi NIM kamu",
                minLength: {
                  value: 5,
                  message: "Masukkan 5 angka terakhir dari NIM kamu",
                },
                maxLength: {
                  value: 5,
                  message: "Masukkan 5 angka terakhir dari NIM kamu",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.nim && errors.nim.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.namaKegiatan}>
          <Heading as='h4' size="md">Nama Kegiatan</Heading>
          <InputGroup>
            <Input
              {...register("namaKegiatan", {
                required: "Isi nama kegiatan kamu"
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.namaKegiatan && errors.namaKegiatan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.deskripsiKegiatan} my={6}>
          <Heading as='h4' size="md">Deskripsi Kegiatan</Heading>
          <InputGroup>
            <Input
              {...register("deskripsiKegiatan", {
                required: "Isi deskripsi kegiatan kamu"
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.deskripsiKegiatan && errors.deskripsiKegiatan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.jenisSKKM}>
          <Heading as='h4' size="md">Jenis SKKM</Heading>
          <InputGroup>
            <Input
              {...register("jenisSKKM", {
                required: "Isi jenis SKKM kamu"
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.jenisSKKM && errors.jenisSKKM.message}
          </FormErrorMessage>
        </FormControl>
        <Flex width="100%" my={6}>
          <Spacer/>
          <Button colorScheme='teal' variant='solid' justifyContent="flex-end" alignSelf="flex-end" type="submit">
            {loading ? <Spinner mr={"5px"} size="sm" /> : ""}
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default FormSKKM;