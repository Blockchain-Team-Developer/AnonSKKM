import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Input,
  InputGroup,
  Select,
  Button,
  Heading,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Spacer,
  Spinner
} from "@chakra-ui/react";
import { DataForm } from "../types/interfaces";
import { useEthers, useEtherBalance, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import SKKMService from '../artifacts/contracts/SKKMService.sol/SKKMService.json';

const FormSKKM: React.FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ISKKMService = new utils.Interface(SKKMService.abi)
  const SKKMServiceAddress = '0xCC8048eF226eb2383B08949F752Cf31932d487cc'
  const contract = new Contract(SKKMServiceAddress, ISKKMService)

  const { state, send } = useContractFunction(contract, 'requestSKKM', { transactionName: 'requestSKKM'})

  const onSubmit = async (data: DataForm) => {
    setLoading(true);

    const dataForm = { 
      address: account,
      nama: data.nama,
      nim: data.nim,
      namaKegiatan: data.namaKegiatan,
      deskripsiKegiatan: data.deskripsiKegiatan,
      jenisSKKM: data.jenisSKKM
    }
    console.log(dataForm);

    send(data.nama, data.nim, data.namaKegiatan, data.deskripsiKegiatan, data.jenisSKKM)

    reset();
    setLoading(false);
  }

  return (
    <Flex py={2} px={16} flexDirection="column">
      <Heading my={4}>Form SKKM</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.nama}>
          <FormLabel>Nama Mahasiswa</FormLabel>
            <Input
              {...register("nama", {
                required: "Isi nama kamu"
              })}
            />
          <FormErrorMessage>
            {errors.nama && errors.nama.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.nim} my={6}>
          <FormLabel>NIM</FormLabel>
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
          <FormErrorMessage>
            {errors.nim && errors.nim.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.namaKegiatan}>
          <FormLabel>Nama Kegiatan</FormLabel>
            <Input
              {...register("namaKegiatan", {
                required: "Isi nama kegiatan kamu"
              })}
            />
          <FormErrorMessage>
            {errors.namaKegiatan && errors.namaKegiatan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.deskripsiKegiatan} my={6}>
          <FormLabel>Deskripsi Kegiatan</FormLabel>
            <Input
              {...register("deskripsiKegiatan", {
                required: "Isi deskripsi kegiatan kamu"
              })}
            />
          <FormErrorMessage>
            {errors.deskripsiKegiatan && errors.deskripsiKegiatan.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.jenisSKKM}>
          <FormLabel>Jenis SKKM</FormLabel>
          <Select
            placeholder="Jenis SKKM yang diajukan"
            {...register("jenisSKKM", {
              required: "Isi jenis SKKM yang diajukan",
            })}
          >
            <option value='0'>Ilmiah dan Penalaran</option>
            <option value='1'>Bakat dan Minat</option>
            <option value='2'>Organisasi dan Pengembangan Kepribadian</option>
            <option value='3'>Pengabdian Masyarakat</option>
          </Select>
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