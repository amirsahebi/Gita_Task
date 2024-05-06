import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chart from 'chart.js/auto';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  IconButton, 
  Tooltip, 
  Grid, 
  Card, 
  CardContent 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import { Bar } from 'react-chartjs-2';
import './App.css'; // Import CSS file

// Sample data
const initialData = [
  { 
    id: uuidv4(), 
    firstName: 'علی', 
    lastName: 'گودرزی', 
    nationalCode: '1234567890', 
    skills: ['React', 'Javascript', 'HTML', 'CSS'], 
    chartData: {
      labels: ['React', 'Javascript', 'HTML', 'CSS'],
      datasets: [
        {
          label: 'مهارت‌ها',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: [5, 4, 3, 4]
        }
      ]
    }
  },
  { 
    id: uuidv4(), 
    firstName: 'سعید', 
    lastName: 'جعفری', 
    nationalCode: '0987654321', 
    skills: ['Node.Js', 'Express', 'Mongo DB'], 
    chartData: {
      labels: ['Node.Js', 'Express', 'Mongo DB'],
      datasets: [
        {
          label: 'مهارت‌ها',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: [3, 4, 3]
        }
      ]
    }
  },
];

function App() {
  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', nationalCode: '', skills: [''] });
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewChartModalOpen, setviewChartModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEmployee(null);
    setFormData({ firstName: '', lastName: '', nationalCode: '', skills: '' });
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const openViewChartModal = (employee) => {
    setSelectedEmployee(employee);
    setviewChartModalOpen(true);
  };

  const closeViewChartModal = () => {
    setviewChartModalOpen(false);
  };

  const openConfirmDelete = (employee) => {
    setDeleteCandidate(employee);
    setConfirmDeleteOpen(true);
  };

  const closeConfirmDelete = () => {
    setDeleteCandidate(null);
    setConfirmDeleteOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.skills.toString())
    if (!formData.firstName || !formData.lastName || !formData.nationalCode || !formData.skills) return;
    if (selectedEmployee) {
      const updatedData = data.map((item) => {
        if (item.id === selectedEmployee.id) {
          return { ...item, ...formData, skills: formData.skills.toString().split(',') };
        }
        return item;
      });
      setData(updatedData);
    } else {
      const newData = [...data, { id: uuidv4(), ...formData, skills: formData.skills.toString().split(',') }];
      setData(newData);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (deleteCandidate) {
      const newData = data.filter((item) => item.id !== deleteCandidate.id);
      setData(newData);
      closeConfirmDelete();
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    openModal();
  };

  const handleView = (employee) => {
    openViewModal(employee);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nationalCode.includes(searchTerm)
  );

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          سامانه مدیریت کارمندان
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="جستجو بر اساس نام، نام خانوادگی یا کد ملی"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => { setFormData({ firstName: '', lastName: '', nationalCode: '', skills: '' }); openModal(); }}
        >
          افزودن کارمند
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="table-cell">ردیف</TableCell>
                <TableCell className="table-cell">نام</TableCell>
                <TableCell className="table-cell">نام خانوادگی</TableCell>
                <TableCell className="table-cell">کد ملی</TableCell>
                <TableCell className="table-cell">مهارت‌ها</TableCell>
                <TableCell className="table-cell">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={item.id} hover>
                  <TableCell className="table-cell">{index + 1}</TableCell>
                  <TableCell className="table-cell">{item.firstName}</TableCell>
                  <TableCell className="table-cell">{item.lastName}</TableCell>
                  <TableCell className="table-cell">{item.nationalCode}</TableCell>
                  <TableCell className="table-cell">{item.skills.join(', ')}</TableCell>
                  <TableCell className="action-cell">
                    <Tooltip title="مشاهده">
                      <IconButton onClick={() => handleView(item)}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="ویرایش">
                      <IconButton onClick={() => handleEdit(item)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="حذف">
                      <IconButton onClick={() => openConfirmDelete(item)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="نمایش نمودار">
                      <IconButton onClick={() => openViewChartModal(item)}>
                        <BarChartIcon color='primary' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography variant="h6" align="center" gutterBottom>
            {selectedEmployee ? 'ویرایش کارمند' : 'افزودن کارمند'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="نام"
              variant="outlined"
              fullWidth
              className="form-field"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="نام خانوادگی"
              variant="outlined"
              fullWidth
              className="form-field"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              label="کد ملی"
              variant="outlined"
              fullWidth
              className="form-field"
              name="nationalCode"
              value={formData.nationalCode}
              onChange={handleChange}
            />
            <TextField
              label="مهارت‌ها (با ویرگول جدا شده)"
              variant="outlined"
              fullWidth
              className="form-field"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                {selectedEmployee ? 'به‌روزرسانی کارمند' : 'افزودن کارمند'}
              </Button>
              <Button variant="contained" color="error" onClick={closeModal}>
                لغو
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Modal
        open={viewModalOpen}
        onClose={closeViewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                جزئیات کارمند
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                نام: {selectedEmployee ? selectedEmployee.firstName : ''}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                نام خانوادگی: {selectedEmployee ? selectedEmployee.lastName : ''}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                کد ملی: {selectedEmployee ? selectedEmployee.nationalCode : ''}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                مهارت‌ها: {selectedEmployee ? selectedEmployee.skills.join(', ') : ''}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                <Button variant="contained" color="primary" onClick={closeViewModal}>
                  بستن
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      <Modal
        open={viewChartModalOpen}
        onClose={closeViewChartModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Card elevation={4}>
            <CardContent>
              <Typography variant="body1" align="center" gutterBottom>
                <Bar data={selectedEmployee ? selectedEmployee.chartData : {}} />
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                <Button variant="contained" color="primary" onClick={closeViewChartModal}>
                  بستن
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      <Modal
        open={confirmDeleteOpen}
        onClose={closeConfirmDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography variant="h6" align="center" gutterBottom>
            آیا مطمئن هستید که می‌خواهید این کارمند را حذف کنید؟
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleDelete}>
              بله
            </Button>
            <Button variant="contained" color="error" onClick={closeConfirmDelete}>
              خیر
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
}

export default App;
