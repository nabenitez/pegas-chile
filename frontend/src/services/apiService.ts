import { JobPost } from '@/app/types';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface PaginatedJobPostsResponse {
    page: number;
    pageSize: number;
    posts: JobPost[];
    totalPages: number;
    totalPosts: number;
}

interface SimilarCompanyNamesResponse {
    companies: string[]
}

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: '/api',
        });
    }

    public async getJobPosts(
        pageNumber?: number,
    ): Promise<AxiosResponse<PaginatedJobPostsResponse>> {
        try {
            const url = pageNumber ? `/jobs/?page=${pageNumber}` : '/jobs/';
            const response = await this.axiosInstance.get(url);
            return response;
        } catch (error) {
            console.error('GetJobPosts request failed', error);
            throw error;
        }
    }

    public async searchForCompaniesByTerm(companyName: string): Promise<AxiosResponse<SimilarCompanyNamesResponse>> {
        try {
            const response = await this.axiosInstance.get(`/search/company?companyName=${companyName}`);
            return response;
        } catch (error) {
            console.error('GetJobPostsByCompanyName request failed', error);
            throw error;
        }
    }

    public async getJobPostsByCompanyName(companyName: string): Promise<AxiosResponse<JobPost[]>> {
        try {
            const response = await this.axiosInstance.post('/jobs/getJobPostsByCompanyName', { companyName: companyName });
            return response;
        } catch (error) {
            console.error('GetJobPostsByCompanyName request failed', error);
            throw error;
        }
    }
}

export default ApiService;
