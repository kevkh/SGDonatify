import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/donorAuth'
import { useParams, Link } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const DonorDetail = () => {
  const defaultPic =
    'https://www.back-tobasics.org/wp-content/uploads/2017/05/default-profile-pic.png'
  const labels = {
    0: 'No rating',
    1: 'Very Poor',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  }
  const [isShowProfile, setIsShowProfile] = useState(true)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [donorProfile, setDonorProfile] = useState('')

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`http://localhost:5000/donor/${id}`)
      setDonorProfile(response.data)
      console.log(donorProfile)
    }
    fetchData()
  }, [])

  let reviewList = donorProfile.reviewList

  return (
    <div >
      <div>
        <Button
          variant='outlined'
          style={{ fontSize: '25px' }}
          onClick={() => {
            setIsShowProfile(true)
          }}
        >
          Donor Profile
        </Button>
        <Button
          variant='outlined'
          style={{ fontSize: '25px' }}
          onClick={() => {
            setIsShowProfile(false)
          }}
        >
          Reviews
        </Button>
      </div>
      <div>
        {isShowProfile ? (
          <div>

            <h1>Name : {donorProfile.name}</h1>
            <h1>Email: {donorProfile.email}</h1>
            <h1>Phone Number : {donorProfile.phoneNumber}</h1>
            <h1>CEA : {donorProfile.CEA}</h1>
            <h1>Agency : {donorProfile.agency}</h1>
            <h1>Overall Rating : {donorProfile.overallRating}</h1>
            <h1>Status : {donorProfile.donor_status}</h1>

          </div>
        ) : (
          <div>
            {reviewList.length === 0 ? (
              <h1>No Review</h1>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Review</TableCell>
                      <TableCell>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {donorProfile.reviewList.map((data, index) => (
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                        key={index}
                      >
                        <TableCell component='th' scope='row'>
                          {data}
                        </TableCell>
                        <TableCell>
                          <Rating
                            name='text-feedback'
                            value={`${donorProfile.ratingList[index]}`}
                            readOnly
                            precision={1}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize='inherit'
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        )}
      </div>
      {donorProfile.donor_status !== "Approved" ? (
        donorProfile.donor_status === "Pending" ? (
          <Button component={Link} to={{
            pathname: `/DonorList`,
          }} color="primary" variant="contained">
            Back
          </Button>
        ) : (<Button component={Link} to={{
          pathname: `/Blacklist`,
        }} color="primary" variant="contained">
          Back
        </Button>)
      ) : (
        <Button component={Link} to={{
          pathname: `/ApprovedList`,
        }} color="primary" variant="contained">
          Back
        </Button>
      )}
    </div>
  )
}

export default DonorDetail
