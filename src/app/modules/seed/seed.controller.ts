import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SeedServices } from './seed.service';
import { CustomRequest } from '../../middlewares/auth';


const seedApplications = catchAsync(async (req: CustomRequest, res) => {
    const result = await SeedServices.seedApplicationsIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Applications seeded successfully!',
        data: result,
    });
});


export const SeedControllers = {
    seedApplications
};
