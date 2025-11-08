import React from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';

const BattleProgress = ({ isOpen, onClose, progressData, userId }) => {
    // Find the user's and opponent's data
    const userProgress = progressData?.find(p => p.userId === userId);
    const opponentProgress = progressData?.find(p => p.userId !== userId);

    const getProblemStatusIcon = (status) => {
        switch (status) {
            case 'solved':
                return <CheckCircleIcon sx={{ color: 'success.main' }} />;
            case 'attempted':
                return <PendingIcon sx={{ color: 'warning.main' }} />;
            default:
                return <ErrorIcon sx={{ color: 'error.main' }} />;
        }
    };

    const getProblemStatusText = (status) => {
        switch (status) {
            case 'solved':
                return 'Solved';
            case 'attempted':
                return 'Attempted';
            default:
                return 'Unsolved';
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Battle Progress</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" gap={4}>
                    {/* User's Progress */}
                    <Box flex={1}>
                        <Typography variant="h6" gutterBottom>
                            You
                            <Typography component="span" color="primary.main" ml={1}>
                                Host
                            </Typography>
                        </Typography>
                        {userProgress?.problems.map((problem, index) => (
                            <Box
                                key={problem.problemId}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    mb: 1
                                }}
                            >
                                {getProblemStatusIcon(problem.status)}
                                <Typography ml={1}>
                                    Problem {index + 1}
                                </Typography>
                                <Typography
                                    ml="auto"
                                    color={problem.status === 'solved' ? 'success.main' :
                                           problem.status === 'attempted' ? 'warning.main' : 'error.main'}
                                >
                                    {getProblemStatusText(problem.status)}
                                </Typography>
                            </Box>
                        ))}
                        <Typography variant="subtitle1" mt={2}>
                            Solved: {userProgress?.problems.filter(p => p.status === 'solved').length}/{userProgress?.problems.length}
                        </Typography>
                    </Box>

                    {/* Opponent's Progress */}
                    <Box flex={1}>
                        <Typography variant="h6" gutterBottom>
                            Challenger
                            <Typography component="span" color="secondary.main" ml={1}>
                                Opponent
                            </Typography>
                        </Typography>
                        {opponentProgress?.problems.map((problem, index) => (
                            <Box
                                key={problem.problemId}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    mb: 1
                                }}
                            >
                                {getProblemStatusIcon(problem.status)}
                                <Typography ml={1}>
                                    Problem {index + 1}
                                </Typography>
                                <Typography
                                    ml="auto"
                                    color={problem.status === 'solved' ? 'success.main' :
                                           problem.status === 'attempted' ? 'warning.main' : 'error.main'}
                                >
                                    {getProblemStatusText(problem.status)}
                                </Typography>
                            </Box>
                        ))}
                        <Typography variant="subtitle1" mt={2}>
                            Solved: {opponentProgress?.problems.filter(p => p.status === 'solved').length}/{opponentProgress?.problems.length}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" mt={3}>
                    <button onClick={onClose} className="btn btn-primary">
                        Close
                    </button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default BattleProgress;