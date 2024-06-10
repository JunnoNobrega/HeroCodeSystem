export interface HttpRequest{
    body?: any;
    headers?: any;
    params?: any;
    query?: any;

}

export interface HttpResponse {
    status: any;
    message: string;
    data?: any;
}